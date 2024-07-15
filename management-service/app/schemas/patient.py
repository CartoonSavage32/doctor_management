from pydantic import BaseModel, EmailStr


class PatientCreate(BaseModel):
    fname: str
    lname: str
    email: EmailStr
    password: str


class PatientResponse(BaseModel):
    PatientID: int
    Name: str
    Email: str
