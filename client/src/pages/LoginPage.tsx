import React from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../services/AuthService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const LoginPage: React.FC = () => {
  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      const response = await login(formData.email, formData.password);
      console.log('Login successful:', response);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <LoginForm onLogin={handleLogin} />
    </Box>
  );
};

export default LoginPage;
