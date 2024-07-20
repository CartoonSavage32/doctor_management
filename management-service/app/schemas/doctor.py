from pydantic import BaseModel, EmailStr

class DoctorCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    specialty: str

class DoctorLogin(BaseModel):
    email: EmailStr
    password: str

class DoctorResponse(BaseModel):
    DoctorID: int
    Name: str
    Email: str
    Specialty: str
