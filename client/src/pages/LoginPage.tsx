import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import FormField from '../components/FormField';
import useLoginForm from '../hooks/useLoginForm';
import { login } from '../services/AuthService';

const LoginPage: React.FC = () => {
  const { email, password, handleChange, handleSubmit } = useLoginForm(async (email, password) => {
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
    }
  });

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
      <form onSubmit={handleSubmit}>
        <FormField
          label="Email Address"
          type="email"
          value={email}
          onChange={handleChange}
          name="email"
        />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={handleChange}
          name="password"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
