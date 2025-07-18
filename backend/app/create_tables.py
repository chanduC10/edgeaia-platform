# create_tables.py

from app.core.db import engine
from app.models.user import Base

# Create all tables
Base.metadata.create_all(bind=engine)
