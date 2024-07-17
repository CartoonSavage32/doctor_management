import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
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

    const SignupForm: React.FC<{ onSignup: (formData: { fname: string; lname: string; email: string; password: string; rePassword: string; specialty: string }) => void }> = ({ onSignup }) => {
        const [fname, setFname] = useState('');
        const [lname, setLname] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [rePassword, setRePassword] = useState('');
        const [specialty, setSpecialty] = useState('');
        const [showPassword, setShowPassword] = useState(false);

        const [fnameError, setFnameError] = useState('');
        const [lnameError, setLnameError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const [rePasswordError, setRePasswordError] = useState('');
        const [specialtyError, setSpecialtyError] = useState('');

        const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
        const validatePassword = (password: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        const validateRePassword = (password: string, rePassword: string): boolean => password === rePassword;
        const validateFName = (fname: string): boolean => fname.trim() !== '';
        const validateLName = (lname: string): boolean => lname.trim() !== '';
        const validateSpecialty = (specialty: string): boolean => specialty.trim() !== '';

        const handleClickShowPassword = () => setShowPassword(!showPassword);
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            let isValid = true;

            if (!validateFName(fname)) {
                setFnameError('First name cannot be empty');
                isValid = false;
            } else {
                setFnameError('');
            }

            if (!validateLName(lname)) {
                setLnameError('Last name cannot be empty');
                isValid = false;
            } else {
                setLnameError('');
            }

            if (!validateEmail(email)) {
                setEmailError('Invalid email format');
                isValid = false;
            } else {
                setEmailError('');
            }

            if (!validatePassword(password)) {
                setPasswordError('Password must contain at least one number, one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.');
                isValid = false;
            } else {
                setPasswordError('');
            }

            if (!validateRePassword(password, rePassword)) {
                setRePasswordError('Passwords do not match');
                isValid = false;
            } else {
                setRePasswordError('');
            }

            if (!validateSpecialty(specialty)) {
                setSpecialtyError('Specialty cannot be empty');
                isValid = false;
            } else {
                setSpecialtyError('');
            }

            if (isValid) {
                onSignup({ fname, lname, email, password, rePassword, specialty });
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label='First Name'
                            type="text"
                            fullWidth
                            margin="normal"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            error={!!fnameError}
                            helperText={fnameError}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Last Name'
                            type="text"
                            fullWidth
                            margin="normal"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            error={!!lnameError}
                            helperText={lnameError}
                        />
                    </Grid>
                </Grid>
                <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Confirm Password"
                    type={"password"}
                    fullWidth
                    margin="normal"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    error={!!rePasswordError}
                    helperText={rePasswordError}
                />
                <TextField
                    label="Specialty"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    error={!!specialtyError}
                    helperText={specialtyError}
                />
                <Button type="submit" variant="contained" color="primary">
                    Sign up
                </Button>
            </form>
        );
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
