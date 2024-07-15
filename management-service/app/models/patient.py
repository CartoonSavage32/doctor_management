from pydantic import BaseModel

class Patient(BaseModel):
    PatientID: int
    Name: str
    Email: str
    PasswordHash: str
