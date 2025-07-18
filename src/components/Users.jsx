import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setError("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) return frm.reportValidity();
    try {
      await axios.post(`${API_URL}/api/users`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setError("User added successfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) return frm.reportValidity();
    try {
      await axios.patch(`${API_URL}/api/users/${editId}`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchUsers();
      setEditId(null);
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    resetForm();
  };

  const resetForm = () => {
    setForm({ firstName: "", lastName: "", email: "", password: "", role: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Management</h2>

        {error && (
          <div className={`text-sm text-center mb-4 p-2 rounded ${
            error.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}>
            {error}
          </div>
        )}

        <form ref={frmRef} className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            name="firstName"
            value={form.firstName}
            type="text"
            placeholder="First Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            value={form.lastName}
            type="text"
            placeholder="Last Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            value={form.email}
            type="text"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            value={form.password}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={form.role}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            required
          >
            <option value="">--Select Role--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex items-center gap-2">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-white transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white transition duration-200 w-full"
              >
                Add
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button
            onClick={fetchUsers}
            className="px-4 py-2 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white transition duration-200"
          >
            Search
          </button>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left border">
            <thead className="bg-purple-100">
              <tr>
                <th className="p-2 border">First Name</th>
                <th className="p-2 border">Last Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((value) => (
                <tr key={value._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{value.firstName}</td>
                  <td className="p-2 border">{value.lastName}</td>
                  <td className="p-2 border">{value.email}</td>
                  <td className="p-2 border capitalize">{value.role}</td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(value)}
                      className="px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(value._id)}
                      className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
