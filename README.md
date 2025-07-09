
# 🌐 Edgeble AI - Orchestration Platform

Edgeble AI is a full-stack AI orchestration platform to train, deploy, and manage Edge AI models. This app is built with **Next.js** (frontend) and **FastAPI** (backend), and containerized using **Docker** for easy development and deployment.

---

## ✨ Features

- 🚀 Fast and secure login/signup
- 📊 Dashboard for authenticated users
- 🔐 JWT-based authentication
- 🎯 Clean and modern UI (Tailwind + Shadcn UI)
- ⚙️ Docker support for running both frontend and backend together

---

## 🧰 Tech Stack

| Layer      | Technology            |
|------------|------------------------|
| Frontend   | Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI |
| Backend    | FastAPI, Python, JWT Authentication |
| API Calls  | Axios |
| Auth       | LocalStorage + Bearer Token |
| DevOps     | Docker + Docker Compose |

---

## 📁 Folder Structure

```
edgeaia-platform/
│
├── backend/
│   ├── app/
│   │   ├── routes/           # All FastAPI routes
│   │   ├── core/             # Auth logic (JWT, password hashing)
│   │   └── main.py           # FastAPI app entry point
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── app/                  # Next.js pages like login, dashboard
│   ├── components/           # UI components
│   ├── public/
│   ├── styles/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Local Setup (Without Docker)

### 📦 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> Your backend will run at: http://localhost:8000

### 💻 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

> Your frontend will run at: http://localhost:3000

---

## 🐳 Setup with Docker (Recommended)

### 🛠️ 1. Prerequisites

- Docker Desktop must be installed and running.

### ▶️ 2. Run the project

```bash
docker compose up --build
```

- Frontend → http://localhost:3000  
- Backend → http://localhost:8000/docs (FastAPI Swagger UI)

---

## ✅ Usage

### 1. Signup

- Visit: `http://localhost:3000`
- Click `Sign up` below the login form
- Create an account using your username and password

### 2. Login

- Use your credentials to log in
- After login, you’ll be redirected to the dashboard

---

## 🔐 API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| POST   | `/auth/signup`    | Register new user    |
| POST   | `/auth/login`     | Get access token     |

> Authentication is handled using JWT. The token is stored in `localStorage`.

---

## ✍️ Author

**Chandu Reddy**  
💻 AI Developer | Full Stack Enthusiast

---

## 📄 License

This project is open-source and free to use for learning or extending.
