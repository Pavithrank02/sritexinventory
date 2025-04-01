// src/components/Card.js
import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export default Card;
