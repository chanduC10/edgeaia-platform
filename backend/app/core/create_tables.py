# core/create_tables.py
from db import Base, engine
from models import User

Base.metadata.create_all(bind=engine)
print("✅ Tables created successfully.")
