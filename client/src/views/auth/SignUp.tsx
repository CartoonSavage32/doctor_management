import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "components/fields/InputField";
import { signup } from "services/AuthService";

interface SignUpFormState {
  name: string;
  email: string;
  password: string;
  speciality: string;
}

const SignUp: React.FC = () => {
  const [formState, setFormState] = useState<SignUpFormState>({
    name: "",
    email: "",
    password: "",
    speciality: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  const handleSignUp = async () => {
    const { name, email, password, speciality } = formState;
    if (!name || !email || !password || !speciality) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      const response = await signup({
        name,
        email,
        password,
        speciality,
      });
      if (response.success) {
        console.log("Sign up successful", response);
        navigate("/auth/sign-in");
      } else {
        setError(response.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setError("An error occurred during sign up.");
    }
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your details to create an account!
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

        {/* Speciality */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Speciality*"
          placeholder="Your speciality"
          id="speciality"
          type="text"
          value={formState.speciality}
          onChange={handleChange}
        />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <button
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Already have an account?
          </span>
          <a
            href="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
