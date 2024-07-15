import os
import uuid
from datetime import datetime

import boto3
from app.db.database import doctors_table
from app.models.pdf import PDF
from dotenv import load_dotenv
from fastapi import UploadFile

load_dotenv()

s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

def upload_pdf(file: UploadFile, doctor_id: int):
    pdf_id = str(uuid.uuid4().int)[:5]
    file_path = f"{doctor_id}/{pdf_id}.pdf"
    s3.upload_fileobj(file.file, os.getenv("S3_BUCKET_NAME"), file_path)
    
    pdf = PDF(
        PDFID=pdf_id,
        DoctorID=doctor_id,
        FilePath=file_path,
        UploadDate=datetime.now().isoformat()
    )
    
    # Save PDF record in the database
    doctors_table.update_item(
        Key={'DoctorID': doctor_id},
        UpdateExpression="SET PDFs = list_append(if_not_exists(PDFs, :empty_list), :pdf)",
        ExpressionAttributeValues={
            ":pdf": [pdf.dict()],
            ":empty_list": []
        }
    )
    
    return pdf
