import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 mt-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
        {/* Site Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-indigo-600">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
            <li><Link to="/cart" className="hover:text-indigo-600">My Cart</Link></li>
            <li><Link to="/order" className="hover:text-indigo-600">My Orders</Link></li>
            <li><Link to="/profile" className="hover:text-indigo-600">Profile</Link></li>
          </ul>
        </div>

        {/* About / Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-indigo-600">About</h4>
          <p className="text-sm">
            This is a MERN stack e-commerce frontend project for learning and demo purposes.
          </p>
          <p className="text-sm mt-2">
            Contact: <a href="mailto:support@example.com" className="text-indigo-600 hover:underline">support@example.com</a>
          </p>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-indigo-600">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600">
              <Twitter size={20} />
            </a>
            <a href="mailto:support@example.com" className="hover:text-indigo-600">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 border-t border-gray-300 py-4">
        &copy; {year} MERN Frontend. All rights reserved.
      </div>
    </footer>
  );
}
