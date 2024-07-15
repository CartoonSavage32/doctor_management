from app.db.database import doctor_patient_relationship_table, patients_table
from app.models.patient import Patient
from app.utils.id import generate_id
from app.utils.password import hash_password


def create_patient(signup_data):
    patient_id = generate_id()

    patient = Patient(
        PatientID=patient_id,
        Name=f"{signup_data.fname} {signup_data.lname}",
        Email=signup_data.email,
        PasswordHash=hash_password(signup_data.password),
    )
    patients_table.put_item(Item=patient.model_dump())
    return patient


def get_patient_by_email(email: str):
    response = patients_table.get_item(Key={"Email": email})
    return response.get("Item")


def link_doctor_patient(doctor_id: int, patient_id: int):
    doctor_patient_relationship_table.put_item(
        Item={"DoctorID": doctor_id, "PatientID": patient_id}
    )
    return {"DoctorID": doctor_id, "PatientID": patient_id}
