import React, { useState } from "react";
import FormInput from "./FormInput";

function AddUserForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", website: "" });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setError("Invalid email.");
      return;
    }
    const newUser = { ...form, id: Date.now() };
    onSubmit(newUser);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">➕ Add New User</h2>

        <FormInput
          label="Name"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <FormInput
          label="Email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <FormInput
          label="Phone"
          placeholder="Enter phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <FormInput
          label="Website"
          placeholder="Enter website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        <div className="flex justify-end mt-4 space-x-3">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 border-[1px] border-red-400 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUserForm;
