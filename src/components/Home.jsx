import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const { cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/all`);
      setProducts(res.data.products.slice(0, 6));
    } catch (err) {
      console.log(err);
      setError("Unable to fetch products.");
    }
  };

  const fetchStats = async () => {
    try {
      const usersRes = await axios.get(`${API_URL}/api/users/count`);
      const ordersRes = await axios.get(`${API_URL}/api/orders/count`);
      // console.log(ordersRes)
      setUsersCount(usersRes.data.totalUsers);
      setOrdersCount(ordersRes.data.totalOrders);
    } catch (err) {
      console.error("Stats error", err);
    }
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  const testimonials = [
    {
      name: "Jane Doe",
      text: "Absolutely love the quality and service. Highly recommend!",
    },
    {
      name: "John Smith",
      text: "Fast delivery and amazing products. Will shop again!",
    },
    {
      name: "Emily Stone",
      text: "Great experience. The UI is clean and easy to use.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-indigo-600 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Welcome to Our Store
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Discover amazing products and deals every day.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100"
          onClick={() => navigate("/product")}
        >
          Browse All Products
        </motion.button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Featured Products
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden p-4 flex flex-col"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={product.imgUrl}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{product.productName}</h3>
              <p className="text-gray-600 flex-1">
                {product.description.slice(0, 80)}...
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-indigo-600 font-semibold text-lg">
                  ${product.price}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Counters */}
      <div className="bg-white py-12 px-6 flex flex-col md:flex-row items-center justify-around text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-4xl font-bold text-indigo-600">{usersCount}</h3>
          <p className="text-gray-700 mt-2">Registered Users</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-4xl font-bold text-indigo-600">{ordersCount}</h3>
          <p className="text-gray-700 mt-2">Orders Placed</p>
        </motion.div>
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-gray-100 py-12 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">What Our Customers Say</h2>
        <div className="max-w-xl mx-auto">
          <Slider {...settings}>
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <p className="text-gray-700 italic mb-4">"{t.text}"</p>
                <h4 className="text-indigo-600 font-semibold">- {t.name}</h4>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      
    </div>
  );
}
