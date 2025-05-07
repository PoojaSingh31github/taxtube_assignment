// components/FormInput.js
import React from "react";

function FormInput({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default FormInput;
