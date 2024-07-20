from datetime import timedelta
from typing import Dict, Union

from app.db import doctor_crud
from app.schemas.doctor import DoctorCreate, DoctorLogin, DoctorResponse
from app.utils.token import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from fastapi import APIRouter, HTTPException, status

router = APIRouter()


@router.post("/signup", response_model=DoctorResponse)
def signup(doctor: DoctorCreate):
    existing_doctor = doctor_crud.get_doctor_by_email(doctor.email)
    if existing_doctor:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_doctor = doctor_crud.create_doctor(doctor)
    return new_doctor


@router.post("/login", response_model=Dict[str, Union[str, DoctorResponse]])
def login(login: DoctorLogin):
    doctor = doctor_crud.authenticate_user(login.email, login.password)
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": doctor["Email"]}, expires_delta=access_token_expires
    )
    doctor_response = DoctorResponse(
        DoctorID=doctor["DoctorID"],
        Name=doctor["Name"],
        Email=doctor["Email"],
        Specialty=doctor["Specialty"],
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "doctor": doctor_response,
    }
