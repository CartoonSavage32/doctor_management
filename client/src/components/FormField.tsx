import TextField from '@mui/material/TextField';
import React from 'react';

interface FormFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    InputProps?: object;
    name: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange, error, required = false, InputProps, name }) => {
    return (
        <TextField
            label={label}
            type={type}
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            required={required}
            error={!!error}
            helperText={error}
            InputProps={InputProps}
            name={name}
        />
    );
};

export default FormField;
