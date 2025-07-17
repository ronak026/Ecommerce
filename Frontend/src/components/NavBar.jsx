import { LogOut, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = localStorage.getItem('isAuthenticated') === "true";
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="https://cdn-icons-png.flaticon.com/128/3501/3501829.png" className="h-8" alt="KLE Logo" />
          <span className="text-2xl font-bold text-gray-800">SHOPPLY</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="px-4 py-2 rounded-md text-indigo-600 border border-indigo-100 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 font-medium transition">Register</Link>
            </>
          ) : (
            <>
              <Link to="/products" className="px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition">Products</Link>
              <Link to="/product/add" className="px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition">Add Products</Link>
              <Link to="/cart" className="px-4 py-2 rounded-md hover:bg-indigo-50 transition">
                <ShoppingCart className="h-5 w-5 text-indigo-600" />
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t border-gray-100 shadow">
          <ul className="flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login" className="block w-full px-4 py-2 rounded-md text-indigo-600 border border-indigo-100 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="block w-full px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 font-medium transition">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/products" className="block w-full px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition">Products</Link>
                </li>
                <li>
                  <Link to="/product/add" className="block w-full px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition">Add Products</Link>
                </li>
                <li>
                  <Link to="/cart" className="block w-full px-4 py-2 rounded-md hover:bg-indigo-50 transition">
                    <ShoppingCart className="h-5 w-5 text-indigo-600 inline" /> Cart
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition"
                  >
                    <LogOut className="h-4 w-4 mr-2 inline" /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;