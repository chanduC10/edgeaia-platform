# app/routes/auth.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.auth import hash_password, verify_password, create_access_token

router = APIRouter()

# Fake DB for now
fake_db = {}

# Signup model
class SignUpModel(BaseModel):
    username: str
    password: str

# Login model
class LoginModel(BaseModel):
    username: str
    password: str

# Signup route
@router.post("/signup")
def signup(user: SignUpModel):
    if user.username in fake_db:
        raise HTTPException(status_code=400, detail="User already exists")
    fake_db[user.username] = hash_password(user.password)
    return {"msg": "User created"}

# Login route
@router.post("/login")
def login(user: LoginModel):
    if user.username not in fake_db:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_password(user.password, fake_db[user.username]):
        raise HTTPException(status_code=401, detail="Wrong password")
    
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
