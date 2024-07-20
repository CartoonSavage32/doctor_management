import React from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const getStrength = (): string => {
    if (!password) return "";
    if (password.length < 8) return "Weak";
    if (password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)) return "Strong";
    return "Medium";
  };

  const strength = getStrength();

  // Construct the class string based on the strength
  let className = "text-sm mt-2";
  switch (strength) {
    case "Weak":
      className += " text-red-500"; // Tailwind class for weak strength
      break;
    case "Medium":
      className += " text-orange-500"; // Tailwind class for medium strength
      break;
    case "Strong":
      className += " text-green-500"; // Tailwind class for strong strength
      break;
    default:
      break;
  }

  return (
    <div className={className}>
      <p>Password Strength: <span className={strength.toLowerCase()}>{strength}</span></p>
    </div>
  );
};

export default PasswordStrengthIndicator;