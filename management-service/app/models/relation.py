from pydantic import BaseModel


class Relation(BaseModel):
    DoctorID: int
    PatientID: int
