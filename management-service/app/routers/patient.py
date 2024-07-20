from typing import Optional
from app.db import patient_crud
from app.schemas.patient import PatientResponse
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/get-all-patients")
def get_all_patients():
    patients = patient_crud.get_all_patients()
    return patients


@router.get("/get-patient", response_model=Optional[PatientResponse])
def get_patient_by_email(email: str):
    patient = patient_crud.get_patient_by_email(email)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient
