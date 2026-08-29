import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

function Register() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-6">

      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -top-24 -left-20"></div>
      <div className="absolute w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-20 bottom-0 right-0"></div>

      {/* Register Card */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            B
          </div>

          <h1 className="text-4xl font-extrabold text-slate-800">
            BusinessIQ
            <span className="text-blue-600"> AI</span>
          </h1>
        </div>

        <p className="text-center text-gray-500 mb-8">
          Create your account
        </p>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">Full Name</label>

          <div className="flex items-center border rounded-xl px-4 py-3">
            <FaUser className="text-gray-400 mr-3" />

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">Email</label>

          <div className="flex items-center border rounded-xl px-4 py-3">
            <FaEnvelope className="text-gray-400 mr-3" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">Password</label>

          <div className="flex items-center border rounded-xl px-4 py-3">
            <FaLock className="text-gray-400 mr-3" />

            <input
              type="password"
              placeholder="Create password"
              className="w-full outline-none"
            />

            <IoEyeOutline className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Confirm Password
          </label>

          <div className="flex items-center border rounded-xl px-4 py-3">
            <FaLock className="text-gray-400 mr-3" />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full outline-none"
            />

            <IoEyeOutline className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
          Create Account
        </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;