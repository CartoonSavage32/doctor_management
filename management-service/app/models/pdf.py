from pydantic import BaseModel
from datetime import datetime

class PDF(BaseModel):
    PDFID: int
    DoctorID: int
    FilePath: str
    UploadDate: datetime
