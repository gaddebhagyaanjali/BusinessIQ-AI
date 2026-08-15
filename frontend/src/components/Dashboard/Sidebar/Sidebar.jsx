import {
  FaChartPie,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaComments,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">

      {/* Logo */}

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-blue-400">
          BusinessIQ AI
        </h1>

      </div>

      {/* Menu */}

      <nav className="mt-8">

        <ul className="space-y-2">

          <li className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 cursor-pointer">
            <FaChartPie />
            Dashboard
          </li>

          <li className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 cursor-pointer">
            <FaChartLine />
            Sales Prediction
          </li>

          <li className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 cursor-pointer">
            <FaShieldAlt />
            Fraud Detection
          </li>

          <li className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 cursor-pointer">
            <FaUsers />
            Customer Analytics
          </li>

          <li className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 cursor-pointer">
            <FaComments />
            Sentiment Analysis
          </li>

          <li className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 cursor-pointer">
            <FaFileAlt />
            Reports
          </li>

          <li className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 cursor-pointer">
            <FaCog />
            Settings
          </li>

        </ul>

      </nav>

      {/* Logout */}

      <div className="absolute bottom-8 w-full">

        <button className="flex items-center gap-3 px-6 py-4 w-full hover:bg-red-600 transition">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>
  );
}

export default Sidebar;