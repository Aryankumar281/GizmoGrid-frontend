import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);
  const [expandedProduct, setExpandedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  const toggleReadMore = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center"
          >
            <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
              <img
                src={product.imgUrl}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">{product.productName}</h3>
            <p className="text-gray-600 mb-2 text-center">
              {expandedProduct === product._id
                ? product.description
                : product.description.length > 100
                ? `${product.description.slice(0, 100)}...`
                : product.description}
            </p>
            {product.description.length > 100 && (
              <button
                onClick={() => toggleReadMore(product._id)}
                className="text-sm text-indigo-500 hover:underline mb-2"
              >
                {expandedProduct === product._id ? "Read Less" : "Read More"}
              </button>
            )}
            <h4 className="text-lg font-bold text-indigo-600 mb-4">${product.price}</h4>
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
