import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">

      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          BusinessIQ AI
        </h2>

        <p className="text-sm text-slate-500">
          Business Intelligence Dashboard
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="hidden items-center rounded-xl bg-slate-100 px-4 py-2 md:flex">
          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 w-40 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          className="relative text-slate-600 transition hover:text-blue-600"
        >
          <FaBell className="text-xl" />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <button
          type="button"
          className="text-blue-600 transition hover:text-blue-700"
        >
          <FaUserCircle className="text-3xl" />
        </button>

      </div>

    </header>
  );
}

export default Topbar;