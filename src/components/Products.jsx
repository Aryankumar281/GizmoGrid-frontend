import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product Deleted Successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("Product updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({ productName: "", description: "", price: "", imgUrl: "" });
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Product Management
        </h2>

        {error && (
          <div
            className={`mb-4 p-3 rounded text-center text-sm font-medium ${
              error.toLowerCase().includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {error}
          </div>
        )}

        <form ref={frmRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            name="productName"
            value={form.productName}
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            name="price"
            value={form.price}
            type="text"
            placeholder="Price"
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            placeholder="Image URL"
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />

          <div className="col-span-full flex gap-3">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Add
              </button>
            )}
          </div>
        </form>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Search product..."
            onChange={(e) => setSearchVal(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <button
            onClick={fetchProducts}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((value) => (
                <tr key={value._id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border">{value.productName}</td>
                  <td className="p-2 border">{value.description}</td>
                  <td className="p-2 border">{value.price}</td>
                  <td className="p-2 border truncate max-w-xs">{value.imgUrl}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(value)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(value._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
