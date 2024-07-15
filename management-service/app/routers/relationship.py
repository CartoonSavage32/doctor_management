from app.db import doctor_crud, patient_crud
from app.schemas.patient import PatientCreate, PatientResponse
from app.utils.token import verify_access_token
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_access_token(token, credentials_exception)

@router.post("/create_patient", response_model=PatientResponse)
def create_patient(patient: PatientCreate):
    existing_patient = patient_crud.get_patient_by_email(patient.email)
    if existing_patient:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_patient = patient_crud.create_patient(patient)
    return new_patient

@router.post("/link_patient")
def link_patient(patient_id: int, token: str = Depends(oauth2_scheme)):
    user_email = get_current_user(token)
    doctor = doctor_crud.get_doctor_by_email(user_email)
    if not doctor:
        raise HTTPException(status_code=400, detail="Invalid user")

    linked_patient = patient_crud.link_doctor_patient(doctor['DoctorID'], patient_id)
    return linked_patient
