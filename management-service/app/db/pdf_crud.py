from datetime import datetime

from app.db.database import pdfs_table
from app.models.pdf import PDF
from app.utils.id import generate_id


def upload_pdf(doctor_id: int, file_path: str):
    pdf_id = generate_id()
    pdf = PDF(
        PDFID=pdf_id,
        DoctorID=doctor_id,
        FilePath=file_path,
        UploadDate=datetime.now(),
    )
    pdfs_table.put_item(Item=pdf.model_dump())
    return pdf
