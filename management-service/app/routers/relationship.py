from typing import List

from app.db import doctor_crud, relation_crud
from app.models.relation import Relation
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


@router.get("/get-all-relations", response_model=List[Relation])
def get_all_relations():
    relations = relation_crud.get_all_relations()
    return relations


@router.post("/link-patient", response_model=Relation)
def link_patient(patient_id: int, token: str = Depends(oauth2_scheme)):
    user_email = get_current_user(token)
    doctor = doctor_crud.get_doctor_by_email(user_email)
    if not doctor:
        raise HTTPException(status_code=400, detail="Invalid user")

    linked_patient = relation_crud.link_doctor_patient(doctor["DoctorID"], patient_id)
    return linked_patient
