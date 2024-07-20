import React, { useState } from 'react';
import InputField from 'components/fields/InputField';

interface PatientFormState {
  name: string;
  email: string;
  password: string;
}

const PatientsForm: React.FC = () => {
  const [formState, setFormState] = useState<PatientFormState>({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = () => {
    const { name, email, password } = formState;
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    setError('');
    // Handle the save logic here
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Patient Form
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter patient details below!
        </p>

        {/* Name */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Name*"
          placeholder="John Doe"
          id="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />

        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <button
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PatientsForm;
