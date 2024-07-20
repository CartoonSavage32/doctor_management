from app.db.database import patients_table
from app.models.patient import Patient
from app.utils.id import generate_id
from app.utils.password import hash_password


def create_patient(signup_data):
    patient_id = generate_id()

    patient = Patient(
        PatientID=patient_id,
        Name=signup_data.name,
        Email=signup_data.email,
        PasswordHash=hash_password(signup_data.password),
    )
    patients_table.put_item(Item=patient.model_dump())
    return patient


def get_all_patients():
    response = patients_table.scan()
    return response.get("Items", [])


def get_patient_by_email(email: str):
    response = patients_table.get_item(Key={"Email": email})
    return response.get("Item")
