# My Care Backend

The first backend version stores the complete My Care state in SQLite. It is
designed for a single user and protects all state endpoints with an API key.

## Run Locally

In PowerShell:

```powershell
$env:MYCARE_API_KEY = "replace-with-a-long-random-secret"
python backend/server.py
```

The API listens on `http://127.0.0.1:8787` by default and creates
`backend/data/mycare.db` automatically.

Optional environment variables:

- `MYCARE_HOST`: listen address, default `127.0.0.1`
- `MYCARE_PORT`: listen port, default `8787`
- `MYCARE_DB_PATH`: SQLite path, default `backend/data/mycare.db`
- `MYCARE_ALLOWED_ORIGINS`: comma-separated frontend origins

For the deployed GitHub Pages frontend, include its exact origin:

```powershell
$env:MYCARE_ALLOWED_ORIGINS = "https://xyfishere.github.io,http://127.0.0.1:4173"
```

## API

All `/api/state` requests require the `X-MyCare-Key` header.

### Health check

```text
GET /api/health
```

### Read state

```text
GET /api/state
```

### Save state

```json
PUT /api/state
{
  "state": {
    "settings": {},
    "morningEntries": [],
    "focusSessions": []
  },
  "expectedRevision": 0
}
```

`expectedRevision` is optional. When supplied, the API returns `409 Conflict`
instead of overwriting a newer state.

### Clear state

```text
DELETE /api/state
```

## Test

```powershell
python -m unittest discover -s backend -p "test_*.py" -v
```

## Next Step

The frontend should keep `localStorage` as its offline cache. Backend sync
should be added after deciding how the user signs in, because embedding an API
key in a public GitHub Pages bundle would expose private data.
