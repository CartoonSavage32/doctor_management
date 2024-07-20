import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/auth';

export const signup = async (formData: { name: string; email: string; password: string; speciality: string }) => {
    const response = await axios.post(`${API_URL}/signup`, formData);
    return response.data;
};

export const signin = async (formData: { email: string; password: string; }) => {
    try {
        const response = await axios.post('/auth/login', formData);
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            return response.data;
        }
        throw new Error('Login failed');
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const patientSignUp = async (formData: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/patientsignup`, formData)
    return response.data;
};
