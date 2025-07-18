import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("Pending");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Order Management</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-center mb-6">
        <select
          defaultValue="Pending"
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <ul className="max-w-4xl mx-auto space-y-4">
        {orders.map((order) => (
          <li
            key={order._id}
            className="bg-white rounded-xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="text-gray-800 mb-2 sm:mb-0">
              <p className="font-medium">Order ID: {order._id}</p>
              <p>Value: ${order.orderValue}</p>
              <p>Status: <span className="capitalize font-semibold">{order.status}</span></p>
            </div>

            {order.status === "Pending" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => updateOrder("cancelled", order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateOrder("completed", order._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  Complete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
