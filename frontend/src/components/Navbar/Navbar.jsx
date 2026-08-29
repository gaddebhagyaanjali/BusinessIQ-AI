import { Link, NavLink } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm z-50">

      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* ================= Logo ================= */}

        <Link to="/" className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">

            <FaChartLine className="text-white text-xl" />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              BusinessIQ
              <span className="text-blue-600"> AI</span>
            </h1>

            <p className="text-xs text-gray-500">
              AI Business Intelligence
            </p>

          </div>

        </Link>

        {/* ================= Navigation ================= */}

        <nav className="hidden lg:flex items-center gap-10">

          <NavLink
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </NavLink>

          <a
            href="#features"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#solutions"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Solutions
          </a>

          <a
            href="#pricing"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Pricing
          </a>

          <a
            href="#contact"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </a>

        </nav>

        {/* ================= Buttons ================= */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-6 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;