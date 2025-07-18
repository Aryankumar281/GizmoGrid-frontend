import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Admin() {
  const { pathname } = useLocation();

  const navLinks = [
    { path: "/admin", label: "Users" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/orders", label: "Orders" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Admin Dashboard</h2>

      <nav className="flex justify-center gap-6 mb-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 rounded-lg shadow transition-all text-sm font-medium ${
              pathname === link.path
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-indigo-50 text-indigo-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <Outlet />
      </div>
    </div>
  );
}
