# create_tables.py
from core.db import engine
from models.user import Base

# Create all tables
Base.metadata.create_all(bind=engine)
