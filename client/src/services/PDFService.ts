import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/pdf';

export const getPDFs = async () => {
  const response = await axios.get(`${API_URL}/get-pdfs`);
  return response.data;
};

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/upload-pdf`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
