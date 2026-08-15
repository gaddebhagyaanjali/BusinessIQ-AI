import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="h-20 bg-white shadow-md flex items-center justify-between px-8">

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-slate-800">
        Dashboard
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search Box */}
        <div className="flex items-center bg-slate-100 rounded-lg px-4 py-2">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-48"
          />

        </div>

        {/* Notification */}
        <button className="text-2xl text-slate-600 hover:text-blue-600 transition">
          <FaBell />
        </button>

        {/* Profile */}
        <button className="text-4xl text-blue-600 hover:text-blue-700 transition">
          <FaUserCircle />
        </button>

      </div>

    </div>
  );
}

export default Topbar;