import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (formData: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email Address"
        type="email"
        fullWidth
        margin="normal"
        value={email} onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password} onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
