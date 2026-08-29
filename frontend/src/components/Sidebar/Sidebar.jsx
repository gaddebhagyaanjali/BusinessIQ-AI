import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHome,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaComments,
  FaFileAlt,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Sales Prediction",
      path: "/sales-prediction",
      icon: <FaChartLine />,
    },
    {
      name: "Fraud Detection",
      path: "/fraud-detection",
      icon: <FaShieldAlt />,
    },
    {
      name: "Customer Analytics",
      path: "/customer-analytics",
      icon: <FaUsers />,
    },
    {
      name: "Sentiment Analysis",
      path: "/sentiment-analysis",
      icon: <FaComments />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaFileAlt />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  const handleNavigation = (path) => {
    console.log("CLICKED:", path);
    navigate(path);
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-slate-900 text-white shadow-2xl">

      {/* Logo */}
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-3xl font-extrabold text-blue-400">
          BusinessIQ AI
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          AI Business Intelligence Platform
        </p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-6 flex-1 overflow-y-auto px-4">

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => handleNavigation(item.path)}
              className={`mb-2 flex w-full items-center gap-4 rounded-xl px-5 py-3 text-left transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </button>
          );
        })}

      </nav>

      {/* Bottom Section */}
      <div className="space-y-2 border-t border-slate-700 p-4">

        {/* Profile */}
        <button
          type="button"
          onClick={() => handleNavigation("/profile")}
          className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <FaUser />

          <span>
            Profile
          </span>
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={() => handleNavigation("/")}
          className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          <FaSignOutAlt />

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;