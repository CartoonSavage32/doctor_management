import logging
from datetime import timedelta

from app.db import doctor_crud
from app.schemas.doctor import DoctorCreate, DoctorResponse, DoctorLogin
from app.utils.token import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from fastapi import APIRouter, HTTPException, status


logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/signup", response_model=DoctorResponse)
def signup(doctor: DoctorCreate):
    existing_doctor = doctor_crud.get_doctor_by_email(doctor.email)
    if existing_doctor:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_doctor = doctor_crud.create_doctor(doctor)
    return new_doctor


@router.post("/login")
def login(login: DoctorLogin):
    logger.info(
        f"Received login request with username: {login.email} with password: {login.password}"
    )
    doctor = doctor_crud.authenticate_user(login.email, login.password)
    logger.info(f"Authentication result: {doctor}")
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": doctor["Email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
