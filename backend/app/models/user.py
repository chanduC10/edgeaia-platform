# backend/app/models/user.py

from sqlalchemy import Column, Integer, String
from app.core.db import Base  # ✅ Using declarative base

# ✅ SQLAlchemy database model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

# ✅ Pydantic schema for user registration
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

# ✅ Optional: for token response schema
class Token(BaseModel):
    access_token: str
    token_type: str
