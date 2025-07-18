from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, projects

app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
   allow_origins=[
  "http://localhost:3000",
  "https://edgeaia-frontend.onrender.com"
]
,  # Or use ["*"] during testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers
app.include_router(auth.router, prefix="/auth")
app.include_router(projects.router, prefix="/api")

# ✅ Root route (for Render to show backend is healthy)
@app.get("/")
def root():
    return {"message": "Backend is working!"}
