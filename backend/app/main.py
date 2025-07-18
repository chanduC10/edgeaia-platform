# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, projects

app = FastAPI()

# ✅ CORS setup (allows frontend to talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # dev frontend
        "https://edgeaia-frontend.onrender.com"  # deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include API routers
app.include_router(auth.router, prefix="/auth")
app.include_router(projects.router, prefix="/api")

# ✅ Root route for health check (used by Render)
@app.get("/")
def root():
    return {"message": "Backend is working!"}
