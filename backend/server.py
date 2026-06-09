"""Small authenticated REST API for persisting My Care state."""

from __future__ import annotations

import argparse
import hashlib
import hmac
import json
import os
import sqlite3
from contextlib import closing
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any

MAX_BODY_BYTES = 2 * 1024 * 1024


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def initialize_database(db_path: Path) -> None:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    with closing(sqlite3.connect(db_path)) as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS app_state (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                payload TEXT NOT NULL,
                revision INTEGER NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        connection.commit()


def read_state(db_path: Path) -> dict[str, Any]:
    with closing(sqlite3.connect(db_path)) as connection:
        row = connection.execute(
            "SELECT payload, revision, updated_at FROM app_state WHERE id = 1"
        ).fetchone()
    if not row:
        return {"state": None, "revision": 0, "updatedAt": None}
    return {"state": json.loads(row[0]), "revision": row[1], "updatedAt": row[2]}


def write_state(
    db_path: Path, state: dict[str, Any], expected_revision: int | None
) -> dict[str, Any] | None:
    payload = json.dumps(state, ensure_ascii=False, separators=(",", ":"))
    updated_at = utc_now()

    with closing(sqlite3.connect(db_path)) as connection:
        connection.execute("BEGIN IMMEDIATE")
        row = connection.execute(
            "SELECT revision FROM app_state WHERE id = 1"
        ).fetchone()
        current_revision = row[0] if row else 0
        if expected_revision is not None and expected_revision != current_revision:
            connection.rollback()
            return None

        revision = current_revision + 1
        connection.execute(
            """
            INSERT INTO app_state (id, payload, revision, updated_at)
            VALUES (1, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                payload = excluded.payload,
                revision = excluded.revision,
                updated_at = excluded.updated_at
            """,
            (payload, revision, updated_at),
        )
        connection.commit()

    return {"revision": revision, "updatedAt": updated_at}


def delete_state(db_path: Path) -> None:
    with closing(sqlite3.connect(db_path)) as connection:
        connection.execute("DELETE FROM app_state WHERE id = 1")
        connection.commit()


class MyCareServer(ThreadingHTTPServer):
    def __init__(
        self,
        server_address: tuple[str, int],
        db_path: Path,
        api_key: str,
        allowed_origins: set[str],
    ) -> None:
        super().__init__(server_address, MyCareRequestHandler)
        self.db_path = db_path
        self.api_key_hash = hashlib.sha256(api_key.encode("utf-8")).digest()
        self.allowed_origins = allowed_origins


class MyCareRequestHandler(BaseHTTPRequestHandler):
    server: MyCareServer

    def log_message(self, message: str, *args: Any) -> None:
        print(f"[mycare-api] {self.address_string()} {message % args}")

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self._send_cors_headers()
        self.send_header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-MyCare-Key")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path == "/api/health":
            self._send_json(HTTPStatus.OK, {"status": "ok"})
            return
        if self.path == "/api/state":
            if not self._authorized():
                return
            self._send_json(HTTPStatus.OK, read_state(self.server.db_path))
            return
        self._send_json(HTTPStatus.NOT_FOUND, {"error": "Not found"})

    def do_PUT(self) -> None:
        if self.path != "/api/state":
            self._send_json(HTTPStatus.NOT_FOUND, {"error": "Not found"})
            return
        if not self._authorized():
            return

        body = self._read_json_body()
        if body is None:
            return
        state = body.get("state")
        expected_revision = body.get("expectedRevision")
        if not isinstance(state, dict):
            self._send_json(HTTPStatus.BAD_REQUEST, {"error": "state must be an object"})
            return
        if expected_revision is not None and (
            not isinstance(expected_revision, int) or expected_revision < 0
        ):
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {"error": "expectedRevision must be a non-negative integer"},
            )
            return

        result = write_state(self.server.db_path, state, expected_revision)
        if result is None:
            self._send_json(
                HTTPStatus.CONFLICT,
                {"error": "Revision conflict", **read_state(self.server.db_path)},
            )
            return
        self._send_json(HTTPStatus.OK, result)

    def do_DELETE(self) -> None:
        if self.path != "/api/state":
            self._send_json(HTTPStatus.NOT_FOUND, {"error": "Not found"})
            return
        if not self._authorized():
            return
        delete_state(self.server.db_path)
        self._send_json(HTTPStatus.OK, {"deleted": True})

    def _authorized(self) -> bool:
        provided_key = self.headers.get("X-MyCare-Key", "")
        provided_hash = hashlib.sha256(provided_key.encode("utf-8")).digest()
        if hmac.compare_digest(provided_hash, self.server.api_key_hash):
            return True
        self._send_json(HTTPStatus.UNAUTHORIZED, {"error": "Unauthorized"})
        return False

    def _read_json_body(self) -> dict[str, Any] | None:
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self._send_json(HTTPStatus.BAD_REQUEST, {"error": "Invalid Content-Length"})
            return None
        if content_length <= 0 or content_length > MAX_BODY_BYTES:
            self._send_json(HTTPStatus.BAD_REQUEST, {"error": "Invalid request size"})
            return None
        try:
            body = json.loads(self.rfile.read(content_length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self._send_json(HTTPStatus.BAD_REQUEST, {"error": "Invalid JSON"})
            return None
        if not isinstance(body, dict):
            self._send_json(HTTPStatus.BAD_REQUEST, {"error": "Body must be an object"})
            return None
        return body

    def _send_json(self, status: HTTPStatus, body: dict[str, Any]) -> None:
        encoded = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self._send_cors_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def _send_cors_headers(self) -> None:
        origin = self.headers.get("Origin")
        if origin and origin in self.server.allowed_origins:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")


def create_server(
    host: str, port: int, db_path: Path, api_key: str, allowed_origins: set[str]
) -> MyCareServer:
    if not api_key:
        raise ValueError("MYCARE_API_KEY is required")
    initialize_database(db_path)
    return MyCareServer((host, port), db_path, api_key, allowed_origins)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the My Care backend API")
    parser.add_argument("--host", default=os.getenv("MYCARE_HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.getenv("MYCARE_PORT", "8787")))
    parser.add_argument(
        "--db",
        type=Path,
        default=Path(os.getenv("MYCARE_DB_PATH", "backend/data/mycare.db")),
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    api_key = os.getenv("MYCARE_API_KEY", "")
    allowed_origins = {
        origin.strip()
        for origin in os.getenv(
            "MYCARE_ALLOWED_ORIGINS",
            "http://127.0.0.1:4173,http://localhost:4173",
        ).split(",")
        if origin.strip()
    }
    server = create_server(args.host, args.port, args.db, api_key, allowed_origins)
    print(f"My Care API listening on http://{args.host}:{server.server_port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
