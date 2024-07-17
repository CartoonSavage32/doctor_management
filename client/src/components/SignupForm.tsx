import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';
import useSignupForm from '../hooks/useSignupForm';
import FormField from './FormField';

interface SignupFormProps {
    onSignup: (formData: { fname: string; lname: string; email: string; password: string; rePassword: string; specialty: string }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
    const {
        formData,
        errors,
        showPassword,
        handleChange,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleSubmit
    } = useSignupForm(onSignup);

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormField
                        label="First Name"
                        type="text"
                        value={formData.fname}
                        onChange={handleChange}
                        error={errors.fname}
                        name="fname"
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormField
                        label="Last Name"
                        type="text"
                        value={formData.lname}
                        onChange={handleChange}
                        error={errors.lname}
                        name="lname"
                    />
                </Grid>
            </Grid>
            <FormField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                name="email"
            />
            <FormField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                name="password"
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
            <FormField
                label="Confirm Password"
                type="password"
                value={formData.rePassword}
                onChange={handleChange}
                error={errors.rePassword}
                name="rePassword"
            />
            <FormField
                label="Specialty"
                type="text"
                value={formData.specialty}
                onChange={handleChange}
                error={errors.specialty}
                name="specialty"
            />
            <Button type="submit" variant="contained" color="primary">
                Sign up
            </Button>
        </form>
    );
};

export default SignupForm;
