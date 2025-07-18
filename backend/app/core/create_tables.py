# create_tables.py (project root level)
from app.core.db import engine
from app.models.user import Base

# Create all tables
print("Creating tables...")
Base.metadata.create_all(bind=engine)
    