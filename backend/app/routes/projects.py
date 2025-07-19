from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import project as project_model
from app.models import user as user_model
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectOut
from app.dependencies import get_current_user

router = APIRouter()

@router.get("/projects", response_model=List[ProjectOut])
def get_projects(current_user: user_model.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(project_model.Project).filter(project_model.Project.owner_id == current_user.id).all()

@router.post("/projects", response_model=ProjectOut)
def create_project(
    project: ProjectCreate,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_project = project_model.Project(
        name=project.name,
        type="Vision",
        status=project.status,
        accuracy=87.5,
        lastTrained="2 days ago",
        deviceCount=4,
        modelVersion="v1.0",
        owner_id=current_user.id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.put("/projects/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    updated: ProjectUpdate,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    project = db.query(project_model.Project).filter(
        project_model.Project.id == project_id,
        project_model.Project.owner_id == current_user.id
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.name = updated.name
    project.status = updated.status
    db.commit()
    db.refresh(project)
    return project

@router.delete("/projects/{project_id}", status_code=204)
def delete_project(
    project_id: int,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    project = db.query(project_model.Project).filter(
        project_model.Project.id == project_id,
        project_model.Project.owner_id == current_user.id
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
