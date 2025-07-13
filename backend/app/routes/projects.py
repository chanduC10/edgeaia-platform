from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import List
from jose import jwt, JWTError
from app.core.auth import SECRET_KEY, ALGORITHM

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# In-memory project store (for testing)
projects_db = []
project_id_counter = 1

# 🧠 Auth verify function
def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# 📦 Project schema
class Project(BaseModel):
    id: int
    name: str
    status: str
    owner: str
    last_updated: str

class CreateProject(BaseModel):
    name: str
    status: str

class UpdateProject(BaseModel):
    name: str
    status: str

# ✅ GET: Fetch all projects
@router.post("/projects", response_model=Project)
async def create_project(project: CreateProject, current_user: str = Depends(verify_token)):
    global project_id_counter

    new_project = {
        "id": project_id_counter,
        "name": project.name,
        "type": "Vision",  # required by frontend
        "status": project.status,
        "accuracy": 87.5,  # dummy
        "lastTrained": "2 days ago",
        "deviceCount": 4,  # dummy
        "modelVersion": "v1.0",  # dummy
        "owner": current_user,
    }

    projects_db.append(new_project)
    project_id_counter += 1
    return new_project


# ✏️ PUT: Update project
@router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: int, updated: UpdateProject, current_user: str = Depends(verify_token)):
    for project in projects_db:
        if project["id"] == project_id and project["owner"] == current_user:
            project["name"] = updated.name
            project["status"] = updated.status
            project["last_updated"] = "2025-07-03"
            return project
    raise HTTPException(status_code=404, detail="Project not found")

# 🗑 DELETE: Remove project
@router.delete("/projects/{project_id}", status_code=204)
async def delete_project(project_id: int, current_user: str = Depends(verify_token)):
    for project in projects_db:
        if project["id"] == project_id and project["owner"] == current_user:
            projects_db.remove(project)
            return
    raise HTTPException(status_code=404, detail="Project not found")
