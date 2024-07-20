import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/patient';

export const getAllPatients = async () => {
  const response = await axios.get(`${API_URL}/get-all-patients`);
  return response.data;
};

export const getPatient = async () => {
  const response = await axios.get(`${API_URL}/get-patient`);
  return response.data;
};

