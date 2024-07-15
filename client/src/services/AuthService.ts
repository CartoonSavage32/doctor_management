import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/auth';

export const signup = async (formData: { fname: string; lname: string; email: string; password: string; rePassword: string; specialty: string }) => {
    const response = await axios.post(`${API_URL}/signup`, formData);
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};
