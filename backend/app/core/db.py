# backend/app/core/db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ✅ PostgreSQL URL for Render (this is safe here)
DATABASE_URL = "postgresql://edgeaia_user:VW0G7mxsGsi3UGLmlGTieGnvsylTsQfS@dpg-d1sibtili9vc73bhe69g-a.oregon-postgres.render.com/edgeaia"

# ✅ Create engine
engine = create_engine(DATABASE_URL)

# ✅ Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Base class for SQLAlchemy models
Base = declarative_base()
