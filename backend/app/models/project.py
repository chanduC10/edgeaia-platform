from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)  # ✅ was 'title'
    description = Column(String)

    type = Column(String, default="Vision")
    status = Column(String, default="active")
    accuracy = Column(Float, default=0.0)
    lastTrained = Column(String, default="unknown")
    deviceCount = Column(Integer, default=0)
    modelVersion = Column(String, default="v1.0")

    created_at = Column(DateTime, default=datetime.utcnow)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="projects")
