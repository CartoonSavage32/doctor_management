import { getAllPatients } from './PatientService';
import { getAllRelations } from './RelationshipService';
import { getPDFs } from './PDFService';

interface Relation {
    doctorId: string;
    patientId: string;
}

interface Patient {
    patientId: string;
    name: string;
    email: string;
    password: string;
}

interface PDFs {
    pdfId: Number;
    doctorId: Number;
    filePath: String;
    uploadDate: String;
}

interface ManagementData {
    patients: Patient[];
    relations: Patient[];
}

interface SubtitleData {
    totalPatients: number;
    myPatients: number;
    unassignedPatients: number;
    myPDFs: number;
}

// Fetch all data required for both management and subtitle data
const fetchAllData = async (): Promise<{
    patients: Patient[];
    relations: Relation[];
    pdfs: PDFs[];
    doctorId: string;
}> => {
    const [allPatientsResponse, allRelationsResponse, pdfsResponse] = await Promise.all([
        getAllPatients(),
        getAllRelations(),
        getPDFs()
    ]);

    const doctorId = localStorage.getItem("doctorId");
    if (!doctorId) {
        throw new Error("Doctor ID not found in localStorage");
    }

    return {
        patients: allPatientsResponse,
        relations: allRelationsResponse,
        pdfs: pdfsResponse,
        doctorId
    };
};

export const fetchManagementData = async (): Promise<ManagementData> => {
    const { patients, relations, doctorId } = await fetchAllData();

    const myPatients = patients.filter((patient: Patient) =>
        relations.some((relation: Relation) => relation.patientId === patient.patientId && relation.doctorId === doctorId)
    );

    const unassignedPatients = patients.filter((patient: Patient) =>
        !relations.some((relation: Relation) => relation.patientId === patient.patientId)
    );

    return {
        patients: myPatients,
        relations: unassignedPatients
    };
};


export const fetchSubtitleData = async (): Promise<SubtitleData> => {
    const { patients, relations, pdfs, doctorId } = await fetchAllData();

    const totalPatients = patients.length;
    const myPatients = relations.filter((relation: Relation) => relation.doctorId === doctorId).length;
    const unassignedPatients = patients.filter((patient: Patient) =>
        !relations.some((relation: Relation) => relation.patientId === patient.patientId)
    ).length;
    const myPDFs = pdfs.length;

    return {
        totalPatients,
        myPatients,
        unassignedPatients,
        myPDFs
    };
};
