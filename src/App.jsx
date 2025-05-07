import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserForm from "./components/AddUserForm";
import Spinner from "./components/Loader";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewUser, setViewUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [sortBy, setSortBy] = useState("name");
  useEffect(() => {
    fetch(USERS_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const addUser = (user) => {
    setUsers([user, ...users]);
    toast.success("User added successfully!");
    setShowAddForm(false);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User deleted successfully!");
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "email") {
      return a.email.localeCompare(b.email);
    }
    return 0;
  });

  const paginatedUsers = sortedUsers.slice((page - 1) * perPage, page * perPage);
  console.log(users)

  return (

    <div className="p-6 bg-gray-50 border-b border-gray-200 ">
  <div className="flex justify-between items-center mb-10">
    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
      User Management Dashboard
    </h1>
    <button
      onClick={() => setShowAddForm(true)}
      className="bg-blue-600 hover:bg-blue-700 border-[1px] cursor-pointer border-red-400 text-white font-medium px-5 py-2 rounded-md shadow transition duration-200"
    >
       Add User
    </button>


    {/* sorting */}
    
  </div>
      {loading ? (
        <Spinner/>
      ) : (
        <>
        <div className="mb-5">
        <button
          onClick={() => setSortBy("name")}
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 border-[1px] border-red-400 text-white px-4 py-2 rounded-md mr-2"
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("email")}
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 border-[1px] border-red-400 text-white px-4 py-2 rounded-md"
        >
          Sort by Email
        </button>
      </div>
       <table className="w-full mt-4 text-sm text-left">
  <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
    <tr>
      <th className="py-3 px-4 w-[200px]">Name</th>
      <th className="py-3 px-4 w-[200px]">Email</th>
      <th className="py-3 px-4 w-[200px]">Phone</th>
      <th className="py-3 px-4 w-[200px]">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {paginatedUsers.map((user) => (
      <tr key={user.id} className="hover:bg-gray-50">
        <td className="py-3 px-4 font-medium text-gray-900 flex items-center w-[200px]">
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-sm font-bold text-white mr-3">
            {user.name.charAt(0)}
          </div>
          {user.name}
        </td>
        <td className="py-3 px-4 text-gray-700 w-[200px]">{user.email}</td>
        <td className="py-3 px-4 text-gray-700 ">{user.phone}</td>
        <td className="py-3 px-4">
          <button
            onClick={() => setViewUser(user)}
            className="text-blue-600 mr-3 cursor-pointer"
          >
            View
          </button>
          <button
            onClick={() => deleteUser(user.id)}
            className="text-red-600 cursor-pointer"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

<div className="my-4 flex justify-center w-full">
  {Array.from({ length: Math.ceil(users.length / perPage) }, (_, i) => (
    <button
      key={i}
      onClick={() => setPage(i + 1)}
      className={`mx-1 px-3 py-1 rounded-full text-sm cursor-pointer font-medium ${
        page === i + 1 ? "bg-blue-600  border-[1px] border-red-400 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {i + 1}
    </button>
  ))}
</div>

        </>
      )}
{viewUser && (
  <div className="fixed top-0 right-0 bg-black/30 backdrop-blur-sm w-full h-full z-40">
    <div className="md:w-1/3 sm:w-96 bg-white float-right p-6 h-full rounded-l-lg flex flex-col items-center">
      
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
        {viewUser.name.charAt(0).toUpperCase()}
      </div>

      {/* Name and Username */}
      <h2 className="text-2xl font-semibold text-gray-800">{viewUser.name}</h2>
      <p className="text-gray-500 italic mb-2">@{viewUser.username}</p>

      {/* Email and Phone */}
      <div className="w-full mt-4 text-sm text-gray-700 space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{viewUser.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Phone:</span>
          <span>{viewUser.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Website:</span>
          <span>{viewUser.website}</span>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6 w-full">
        <h3 className="text-md font-semibold text-gray-800 mb-2">Address</h3>
        <div className="text-sm text-gray-600">
          <p>Street: {viewUser?.address?.street}</p>
          <p>Suite: {viewUser?.address?.suite}</p>
          <p>City: {viewUser?.address?.city}</p>
          <p>Zip: {viewUser?.address?.zipcode}</p>
        </div>
      </div>

      {/* Company */}
      <div className="mt-6 w-full">
        <h3 className="text-md font-semibold text-gray-800 mb-2">Company</h3>
        <div className="text-sm text-gray-600">
          <p>Name: {viewUser?.company?.name}</p>
          <p>BS: {viewUser?.company?.bs}</p>
          <p>Catchphrase: <em>"{viewUser?.company?.catchPhrase}"</em></p>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-start items-center w-full mt-2">
      <button
        onClick={() => setViewUser(null)}
        className="mt-8 bg-gray-700 hover:bg-gray-900 cursor-pointer text-white py-2 px-6 rounded-md shadow"
      >
        Close
      </button>
      </div>
    </div>
  </div>
)}
      {showAddForm && (
        <AddUserForm
          onClose={() => setShowAddForm(false)}
          onSubmit={addUser}
        />
      )}

      <ToastContainer />
    </div>
  );
}
