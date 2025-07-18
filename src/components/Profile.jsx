import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      setForm(result.data); // preload form with profile data
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setUser({});
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      await axios.patch(url, form);
      fetchProfile();
      setError("Data saved successfully.");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-8 flex justify-center items-center min-h-[60vh]">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">My Profile</h3>

        {error && (
          <div
            className={`mb-4 p-3 rounded text-center ${
              error.toLowerCase().includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            value={form.firstName || ""}
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            value={form.lastName || ""}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            value={form.email || ""}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            value={form.password || ""}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={logout}
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition duration-200"
          >
            Logout
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-200"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
