from datetime import datetime

import boto3
from app.db import doctor_crud, pdf_crud
from app.schemas.pdf import PDFResponse
from app.utils.token import verify_access_token
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()

s3 = boto3.client("s3")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

BUCKET_NAME = "doctors-pdfs"


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_access_token(token, credentials_exception)


@router.post("/upload", response_model=PDFResponse)
def upload_pdf(file: UploadFile = File(...), token: str = Depends(oauth2_scheme)):
    user_email = get_current_user(token)
    doctor = doctor_crud.get_doctor_by_email(user_email)
    if not doctor:
        raise HTTPException(status_code=400, detail="Invalid user")

    file_location = (
        f"pdfs/{doctor['DoctorID']}/{datetime.utcnow().timestamp()}_{file.filename}"
    )
    try:
        s3.upload_fileobj(file.file, BUCKET_NAME, file_location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")

    pdf = pdf_crud.upload_pdf(doctor["DoctorID"], file_location)
    return pdf
