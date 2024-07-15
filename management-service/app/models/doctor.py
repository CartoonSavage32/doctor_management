from pydantic import BaseModel

class Doctor(BaseModel):
    DoctorID: int
    Name: str
    Email: str
    PasswordHash: str
    Specialty: str
