import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-600 mb-2 sm:mb-0">
          GizmoGrid
        </h1>
        <nav className="flex flex-wrap gap-4 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            My Cart
          </Link>
          <Link
            to="/order"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            My Orders
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-indigo-600 transition-colors duration-200"
            >
              Admin
            </Link>
          )}
          {user?.token ? (
            <Link
              to="/profile"
              className="hover:text-indigo-600 transition-colors duration-200"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-indigo-600 transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
