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
- Automatic Google Doc sync when users mark a question complete (updates prior question version in master doc)

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

`/config.js` should point to your deployed backend when hosting the frontend publicly (for example GitHub Pages):

```js
window.SURVEY_CONFIG = {
  BACKEND_BASE_URL: "https://your-backend-domain.com",
  AI_ENDPOINT: "",
  NOTIFICATION_WEBHOOK_URL: "",
  GOOGLE_DOC_WEBHOOK_URL: "",
  OPENAI_API_KEY: "",
  OPENAI_MODEL: "gpt-4o-mini",
  BUDGET_SHEET_URL: ""
};
```

If `BACKEND_BASE_URL` is blank, the app attempts `https://<frontend-origin>/api`.

## Backend env values

See `/backend/.env.example` and `/backend/README.md` for required auth, SMTP, and Google values.
