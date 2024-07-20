from pydantic import BaseModel, EmailStr


class PatientCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class PatientResponse(BaseModel):
    PatientID: int
    Name: str
    Email: str
