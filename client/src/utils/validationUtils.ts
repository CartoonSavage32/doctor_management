export const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (password: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
export const validateRePassword = (password: string, rePassword: string): boolean => password === rePassword;
export const validateFName = (fname: string): boolean => fname.trim() !== '';
export const validateLName = (lname: string): boolean => lname.trim() !== '';
export const validateSpecialty = (specialty: string): boolean => specialty.trim() !== '';

export const errorMessages = {
    fnameError: 'First name cannot be empty',
    lnameError: 'Last name cannot be empty',
    emailError: 'Invalid email format',
    passwordError: 'Password must contain at least one number, one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.',
    rePasswordError: 'Passwords do not match',
    specialtyError: 'Specialty cannot be empty'
};
