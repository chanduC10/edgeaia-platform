# backend/app/core/db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Direct connection string (safe here because Render DB is private)
DATABASE_URL = "postgresql://edgeaia_user:VW0G7mxsGsi3UGLmlGTieGnvsylTsQfS@dpg-d1sibtili9vc73bhe69g-a.oregon-postgres.render.com/edgeaia"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
