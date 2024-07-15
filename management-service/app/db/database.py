import os

from boto3 import resource as boto3_client
from dotenv import load_dotenv

load_dotenv()

dynamodb = boto3_client(
    "dynamodb",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION"),
)

doctors_table = dynamodb.Table("doctor-table")
patients_table = dynamodb.Table("patients-table")
pdfs_table = dynamodb.Table("pdfs-table")
doctor_patient_relationship_table = dynamodb.Table("doctor-patient-relationship-table")
