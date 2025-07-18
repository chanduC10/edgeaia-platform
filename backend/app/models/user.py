# backend/app/models/user.py

from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from app.core.db import Base

# SQLAlchemy DB model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

# Pydantic schemas for API
class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
