import { useState } from 'react';
import { validateEmail, validatePassword, validateRePassword, validateFName, validateLName, validateSpecialty, errorMessages } from '../utils/validationUtils';

const useSignupForm = (onSignup: (formData: { fname: string; lname: string; email: string; password: string; rePassword: string; specialty: string }) => void) => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        rePassword: '',
        specialty: ''
    });

    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        rePassword: '',
        specialty: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!validateFName(formData.fname)) {
            newErrors.fname = errorMessages.fnameError;
            isValid = false;
        } else {
            newErrors.fname = '';
        }

        if (!validateLName(formData.lname)) {
            newErrors.lname = errorMessages.lnameError;
            isValid = false;
        } else {
            newErrors.lname = '';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = errorMessages.emailError;
            isValid = false;
        } else {
            newErrors.email = '';
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = errorMessages.passwordError;
            isValid = false;
        } else {
            newErrors.password = '';
        }

        if (!validateRePassword(formData.password, formData.rePassword)) {
            newErrors.rePassword = errorMessages.rePasswordError;
            isValid = false;
        } else {
            newErrors.rePassword = '';
        }

        if (!validateSpecialty(formData.specialty)) {
            newErrors.specialty = errorMessages.specialtyError;
            isValid = false;
        } else {
            newErrors.specialty = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSignup(formData);
        }
    };

    return {
        formData,
        errors,
        showPassword,
        handleChange,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleSubmit
    };
};

export default useSignupForm;
