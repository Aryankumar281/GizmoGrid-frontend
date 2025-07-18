import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/register`;
      const result = await axios.post(url, user);
      setError("Registration successful!");
      Navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        {error && (
          <div className={`text-sm text-center mb-4 p-2 rounded ${
            error.includes("success") ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"
          }`}>
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter First Name"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Last Name"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Email Address"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Submit
        </button>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-sm">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
