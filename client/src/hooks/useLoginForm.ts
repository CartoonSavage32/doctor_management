import { useState } from 'react';

const useLoginForm = (onLogin: (email: string, password: string) => void) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return {
        email,
        password,
        handleChange,
        handleSubmit
    };
};

export default useLoginForm;
