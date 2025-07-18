import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">My Cart</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="max-w-4xl mx-auto space-y-4">
        {cart &&
          cart.map(
            (value) =>
              value.qty > 0 && (
                <div
                  key={value._id}
                  className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{value.productName}</h3>
                    <p className="text-sm text-gray-600">Price: ${value.price}</p>
                    <p className="text-sm text-gray-600">Total: ${value.price * value.qty}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrement(value._id, value.qty)}
                      className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-2 font-medium">{value.qty}</span>
                    <button
                      onClick={() => increment(value._id, value.qty)}
                      className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              )
          )}

        <div className="text-right mt-6">
          <h5 className="text-xl font-bold text-indigo-700">Order Value: ${orderValue}</h5>
        </div>

        <div className="text-center mt-6">
          {user?.token ? (
            <button
              onClick={placeOrder}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Place Order
            </button>
          ) : (
            <button
              onClick={() => Navigate("/login")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Login to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
