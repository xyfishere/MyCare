import json
import threading
import unittest
import urllib.error
import urllib.request
from pathlib import Path

from server import create_server


class MyCareApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.db_path = Path(__file__).parent / "data" / "test-mycare.db"
        cls.db_path.parent.mkdir(parents=True, exist_ok=True)
        cls.db_path.unlink(missing_ok=True)
        cls.server = create_server(
            "127.0.0.1",
            0,
            cls.db_path,
            "test-key",
            {"http://127.0.0.1:4173"},
        )
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base_url = f"http://127.0.0.1:{cls.server.server_port}"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.db_path.unlink(missing_ok=True)

    def request(self, method, path, body=None, api_key="test-key"):
        data = json.dumps(body).encode("utf-8") if body is not None else None
        request = urllib.request.Request(
            self.base_url + path,
            data=data,
            method=method,
            headers={
                "Content-Type": "application/json",
                "X-MyCare-Key": api_key,
                "Origin": "http://127.0.0.1:4173",
            },
        )
        try:
            with urllib.request.urlopen(request) as response:
                return response.status, json.load(response), response.headers
        except urllib.error.HTTPError as error:
            return error.code, json.load(error), error.headers

    def setUp(self):
        self.request("DELETE", "/api/state")

    def test_health_does_not_require_authentication(self):
        status, body, _ = self.request("GET", "/api/health", api_key="")
        self.assertEqual(status, 200)
        self.assertEqual(body, {"status": "ok"})

    def test_state_requires_authentication(self):
        status, body, _ = self.request("GET", "/api/state", api_key="wrong")
        self.assertEqual(status, 401)
        self.assertEqual(body["error"], "Unauthorized")

    def test_save_read_and_delete_state(self):
        state = {"focusSessions": [{"minutes": 25}], "settings": {"language": "zh"}}
        status, saved, headers = self.request(
            "PUT", "/api/state", {"state": state, "expectedRevision": 0}
        )
        self.assertEqual(status, 200)
        self.assertEqual(saved["revision"], 1)
        self.assertEqual(headers["Access-Control-Allow-Origin"], "http://127.0.0.1:4173")

        status, loaded, _ = self.request("GET", "/api/state")
        self.assertEqual(status, 200)
        self.assertEqual(loaded["state"], state)
        self.assertEqual(loaded["revision"], 1)

        status, deleted, _ = self.request("DELETE", "/api/state")
        self.assertEqual(status, 200)
        self.assertTrue(deleted["deleted"])

        status, loaded, _ = self.request("GET", "/api/state")
        self.assertEqual(status, 200)
        self.assertIsNone(loaded["state"])

    def test_revision_conflict_prevents_overwrite(self):
        self.request("PUT", "/api/state", {"state": {"version": 1}, "expectedRevision": 0})
        status, body, _ = self.request(
            "PUT", "/api/state", {"state": {"version": 2}, "expectedRevision": 0}
        )
        self.assertEqual(status, 409)
        self.assertEqual(body["state"], {"version": 1})
        self.assertEqual(body["revision"], 1)


if __name__ == "__main__":
    unittest.main()
