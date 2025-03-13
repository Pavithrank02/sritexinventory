// src/components/Button.js
import React from "react";

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseStyles =
    "px-4 py-2 font-semibold rounded-lg focus:outline-none transition";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    link: "text-blue-500 underline hover:text-blue-600",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
