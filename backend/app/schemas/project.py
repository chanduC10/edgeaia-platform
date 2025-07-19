from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    status: Optional[str] = "active"

class ProjectUpdate(ProjectBase):
    status: Optional[str] = "active"

class ProjectOut(ProjectBase):
    id: int
    status: str
    accuracy: float
    lastTrained: str
    deviceCount: int
    modelVersion: str
    created_at: datetime

    class Config:
        orm_mode = True
