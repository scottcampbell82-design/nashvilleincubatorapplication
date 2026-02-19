# TN Incubator Charter Backend

Express backend for the TN Incubator Charter Application App with authentication, application access control, coach sharing, and admin oversight.

## Core features

- Login/password authentication (JWT)
- Forgot password + reset token flow
- Role support:
  - `user`
  - `admin` (based on `ADMIN_EMAIL`)
- Per-application access control:
  - owner
  - selected coaches (by email)
  - admin (all access)
- Protected AI, notification, and Google Doc endpoints
- Admin overview includes:
  - user login info
  - applications
  - generated Google docs and section metadata

## Endpoints

Public:
- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

Authenticated:
- `GET /auth/me`
- `POST /ai`
- `GET /applications`
- `POST /applications`
- `GET /applications/:id`
- `PUT /applications/:id/state`
- `POST /applications/:id/coaches`
- `DELETE /applications/:id/coaches/:coachId`
- `POST /notify`
- `POST /applications/:id/google-doc`
- `POST /google-doc` (compat route with `applicationId` in body)

Admin only:
- `GET /admin/overview`

## Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Configure `.env` values:

- Auth:
  - `JWT_SECRET`
  - `ADMIN_EMAIL`
  - `ALLOWED_ORIGIN` (comma-separated allowed frontend origins, e.g. `http://localhost:8000,http://127.0.0.1:8000`)
- OpenAI:
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL`
- SMTP (for notifications + password reset emails):
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `EMAIL_FROM`
- Google Docs:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
  - Optional `GOOGLE_DRIVE_FOLDER_ID`, `GOOGLE_DOC_SHARE_WITH`

4. Start backend:

```bash
npm run dev
```

Backend runs on `http://localhost:8787` by default.

## Notes

- Data is stored in `backend/data/store.json`.
- If SMTP is not configured, forgot-password returns a `devResetToken` for local testing.
