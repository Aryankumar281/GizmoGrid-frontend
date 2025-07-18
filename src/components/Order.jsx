import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-center mb-6">My Orders</h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-6 max-w-4xl mx-auto">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow-md rounded-xl p-6">
            <p className="text-lg font-semibold mb-2">Order ID: <span className="font-normal">{order._id}</span></p>
            <p className="mb-1">Order Value: <span className="font-medium text-indigo-600">${order.orderValue}</span></p>
            <p className="mb-4">Status: <span className="capitalize font-medium">{order.status}</span></p>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 border">Product</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Quantity</th>
                    <th className="px-4 py-2 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="px-4 py-2 border">{item.productName}</td>
                      <td className="px-4 py-2 border">${item.price}</td>
                      <td className="px-4 py-2 border">{item.qty}</td>
                      <td className="px-4 py-2 border">${item.qty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
