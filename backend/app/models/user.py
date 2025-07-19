# backend/app/models/user.py

# ✅ For API response (token)
from pydantic import BaseModel
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String
from app.database import Base

class Token(BaseModel):
    access_token: str
    token_type: str

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # ✅ Relationship with Project model
    projects = relationship("Project", back_populates="owner")
