from app.db.database import doctor_patient_relationship_table
from app.models.relation import Relation


def get_all_relations():
    response = doctor_patient_relationship_table.scan()
    return response.get("Items", [])


def link_doctor_patient(doctor_id: int, patient_id: int):
    linked_relation = Relation(DoctorID=doctor_id, PatientID=patient_id)

    doctor_patient_relationship_table.put_item(
        Item={"DoctorID": doctor_id, "PatientID": patient_id}
    )
    return linked_relation
