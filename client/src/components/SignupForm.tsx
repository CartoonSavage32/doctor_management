import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

interface SignupFormProps {
  onSignup: (formData: { fname: string; lname: string; email: string; password: string; rePassword: string; specialty: string }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Individual error states for each field
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');
  const [specialtyError, setSpecialtyError] = useState('');

  const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const validateRePassword = (password: string, rePassword: string): boolean => {
    return password === rePassword;
  };

  const validateFName = (fname: string): boolean => {
    return fname.trim() !== '';
  };

  const validateLName = (lname: string): boolean => {
    return lname.trim() !== '';
  };

  const validateSpecialty = (specialty: string): boolean => {
    return specialty.trim() !== '';
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
            value={fname} onChange={(e) => setFname(e.target.value)}
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
            value={lname} onChange={(e) => setLname(e.target.value)}
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
        value={email} onChange={(e) => setEmail(e.target.value)}
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
        value={rePassword} onChange={(e) => setRePassword(e.target.value)}
        error={!!rePasswordError}
        helperText={rePasswordError}
      />

      <TextField
        label="Specialty"
        type="text"
        fullWidth
        margin="normal"
        value={specialty} onChange={(e) => setSpecialty(e.target.value)}
        error={!!specialtyError}
        helperText={specialtyError}
      />

      <Button type="submit" variant="contained" color="primary">
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
