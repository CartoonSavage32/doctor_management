from datetime import datetime

from app.db.database import pdfs_table
from app.models.pdf import PDF
from app.schemas.pdf import PDFResponse
from app.utils.id import generate_id


def get_pdfs_by_doctor_id(doctor_id: int):
    query = """
    SELECT PDFID, DoctorID, FilePath, UploadDate
    FROM PDFTable  -- Replace with your actual table name
    WHERE DoctorID = :doctor_id
    """
    result = pdfs_table.execute(query, {"doctor_id": doctor_id})
    return [PDFResponse(**pdf) for pdf in result.fetchall()]


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
