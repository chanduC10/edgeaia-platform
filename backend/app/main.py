from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, projects  # Make sure both exist!
from app.models import user, project  # <-- add project here


app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://edgeaia-frontend.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers
app.include_router(auth.router, prefix="/auth")
app.include_router(projects.router, prefix="/api")


# ✅ Root route
@app.get("/")
def root():
    return {"message": "Backend is working!"}

# ✅ DB table creation
from app.database import Base, engine
from app.models import user  # Import your model so Base sees it

Base.metadata.create_all(bind=engine)
