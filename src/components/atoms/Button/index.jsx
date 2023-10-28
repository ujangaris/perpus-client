import React from "react";
import "./Button.css";
const Button = ({ label, variant, ...rest }) => {
  return (
    <div>
      <button
        className={`nav-link btn-${variant} text-center`}
        style={{ width: "100%" }}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
