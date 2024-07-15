from pydantic import BaseModel
from datetime import datetime

class PDFUpload(BaseModel):
    FilePath: str

class PDFResponse(BaseModel):
    PDFID: int
    DoctorID: int
    FilePath: str
    UploadDate: datetime
