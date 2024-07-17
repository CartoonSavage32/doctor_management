import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import SignupForm from '../components/SignupForm';
import { signup } from '../services/AuthService';

const SignupPage: React.FC = () => {
    const handleSignup = async (formData: { fname: string; lname: string; email: string; password: string; rePassword: string; specialty: string }) => {
        try {
            const response = await signup(formData);
            console.log('Signup successful:', response);
            // Handle successful signup (e.g., redirect to login)
        } catch (error) {
            console.error('Signup failed:', error);
            // Handle signup error
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '600px',
                height: '100vh',
                padding: '0 16px',
                margin: 'auto',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            <SignupForm onSignup={handleSignup} />
        </Box>
    );
};

export default SignupPage;
