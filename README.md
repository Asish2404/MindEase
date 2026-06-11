# MINDEASE – Student Mental Wellness Platform (SDG 3)

A production-ready ESD project aligned with **SDG 3: Good Health and Well-being**.

## What it does
MindEase helps students:
- Track mood check-ins
- Assess stress via a 10-question quiz
- Compute wellness score + show trends
- Build daily habits with progress
- Get stress-based recommendations
- Access emergency support

All student data is stored in **browser localStorage** (frontend only). The FastAPI backend provides helper endpoints (health + quotes).

---

## Folder structure
```
backend/
  main.py
  requirements.txt
  models.py
  schemas.py
  routes/
    quotes.py
    mood.py
    stress.py
    habits.py
    profile.py

frontend/
  index.html
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    main.jsx
    App.jsx
    styles.css
    components/
    pages/
    services/
    data/
```

---

## 1) Backend (FastAPI)
From repo root:

```bash
cd e:/Atanu/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend URLs:
- `http://localhost:8000/`
- `http://localhost:8000/health`
- `http://localhost:8000/quotes`

---

## 2) Frontend (Vite + React)
From repo root:

```bash
cd e:/Atanu/frontend
npm install
npm run dev
```

Open the Vite URL printed in your terminal (default `http://localhost:5173`).

---

## Notes (local-first)
- Register/Login/Auth are stored in **localStorage** for this academic demo.
- Mood/stress/habits/profile/settings are also stored in **localStorage**.
- Charts and analytics are computed directly from localStorage history.

