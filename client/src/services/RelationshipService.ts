import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/relationship';

export const getAllRelations = async () => {
    const response = await axios.get(`${API_URL}/get-all-relations`);
    return response.data;
};

export const getRelation = async () => {
    const response = await axios.get(`${API_URL}/get-relation`);
    return response.data;
};


export const linkPatient = async () => {
    const response = await axios.post(`${API_URL}/link-patient`);
    return response.data;
};