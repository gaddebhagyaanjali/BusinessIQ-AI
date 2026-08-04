import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaChartLine className="text-blue-600 text-3xl" />
          <h1 className="text-2xl font-bold text-slate-800">
            BusinessIQ AI
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-slate-700 font-medium">

          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Services
            </Link>
          </li>

          <li>
            <Link to="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              About
            </Link>
          </li>

          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </li>

        </ul>

        {/* Buttons */}
        <div className="flex gap-4">

          <Link to="/login">
            <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;