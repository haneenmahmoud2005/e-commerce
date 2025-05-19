import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import { cartContext } from '../../context/cartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, setLogin } = useContext(userContext);
  const { cartNumber } = useContext(cartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setLogin(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-200 to-fuchsia-600 px-6 sm:px-10 lg:px-24 shadow-lg">
      <div className="flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <p
            className="text-3xl text-white font-semibold font-sans tracking-wide me-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Haneen
          </p>
        </div>

        {/* Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-indigo-900 focus:outline-none hover:text-indigo-700 transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`w-full lg:flex justify-between items-center ${
            isOpen ? 'block' : 'hidden'
          } lg:block`}
        >
          {isLogin ? (
            <ul className="flex flex-col lg:flex-row lg:items-center list-none mt-4 lg:mt-0 lg:space-x-6 text-center text-indigo-900 font-medium text-lg">
              <li>
                <NavLink
                  to="/"
                  className="block p-2 rounded hover:bg-indigo-400 hover:text-white transition"
                >
                  Products
                </NavLink>
              </li>
              <li className="relative">
                <NavLink
                  to="/carts"
                  className="block p-2 rounded hover:bg-indigo-400 hover:text-white transition"
                >
                  Carts
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-indigo-900 text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                    {cartNumber}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className="block p-2 rounded hover:bg-indigo-400 hover:text-white transition"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allOrders"
                  className="block p-2 rounded hover:bg-indigo-400 hover:text-white transition"
                >
                  All Orders
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block p-2 text-red-600 hover:text-red-800 rounded transition font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col lg:flex-row lg:items-center list-none mt-4 lg:mt-0 lg:space-x-6 text-center text-indigo-900 font-medium text-lg">
              <li>
                <NavLink
                  to="/register"
                  className="block p-2 rounded hover:bg-indigo-400 hover:text-white transition"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="block p-2 rounded hover:bg-indigo-400 hover:text-white transition"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
