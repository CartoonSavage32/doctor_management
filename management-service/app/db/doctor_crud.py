from app.db.database import doctors_table
from app.models.doctor import Doctor
from app.utils.id import generate_id
from app.utils.password import hash_password, verify_password
import logging

logger = logging.getLogger(__name__)


def create_doctor(signup_data):
    doctor_id = generate_id()
    doctor = Doctor(
        DoctorID=doctor_id,
        Name=f"{signup_data.fname} {signup_data.lname}",
        Email=signup_data.email,
        PasswordHash=hash_password(signup_data.password),
        Specialty=signup_data.specialty,
    )
    doctors_table.put_item(Item=doctor.model_dump())
    return doctor


def get_doctor_by_email(email: str):
    response = doctors_table.get_item(Key={"Email": email})
    return response.get("Item") 


def authenticate_user(email: str, password: str):
    logger.info(f"login request from {email} with password: {password}")
    doctor = get_doctor_by_email(email)
    if not doctor or not verify_password(password, doctor["PasswordHash"]):
        return None
    return doctor
