# TN Incubator Charter Application App

Secure browser app + backend for drafting, scoring, revising, and assembling Tennessee charter applications.

## Major capabilities

- Secure access with login/password
- Forgot password + reset flow
- 62-question workflow with rubric and scoring features
- School-name-aware writing style profile
- AI drafting/scoring/revision support
- Redline-style suggested edits with acceptance
- Owner + coach access sharing for each application
- Admin access to:
  - all applications
  - user login info
  - Google doc and section metadata
- Google Doc generation and finance budget tools

## Project structure

- `/index.html`, `/app.js`, `/styles.css` -> frontend
- `/backend` -> authenticated API backend

## Quick start

1. Start backend:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

2. In another terminal, serve frontend:

```bash
cd ..
python3 -m http.server 8000
```

3. Open:

- Frontend: `http://localhost:8000`
- Backend health: `http://localhost:8787/health`

## Frontend config

`/config.js` defaults are local backend values:

```js
window.SURVEY_CONFIG = {
  AI_ENDPOINT: "http://localhost:8787/ai",
  NOTIFICATION_WEBHOOK_URL: "http://localhost:8787/notify",
  GOOGLE_DOC_WEBHOOK_URL: "http://localhost:8787/google-doc",
  OPENAI_API_KEY: "",
  OPENAI_MODEL: "gpt-4o-mini",
  BUDGET_SHEET_URL: ""
};
```

## Backend env values

See `/backend/.env.example` and `/backend/README.md` for required auth, SMTP, and Google values.
