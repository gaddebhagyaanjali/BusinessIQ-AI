import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

function Login() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-6">

      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -top-24 -left-20"></div>

      <div className="absolute w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-20 bottom-0 right-0"></div>

      {/* Login Card */}
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
          Transforming Business Data into Intelligent Decisions
        </p>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 mt-2 mb-8">
          Sign in to continue to your dashboard.
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Email Address
          </label>

          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-blue-500">

            <FaEnvelope className="text-gray-400 mr-3 text-lg" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none bg-transparent"
            />

          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Password
          </label>

          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-blue-500">

            <FaLock className="text-gray-400 mr-3 text-lg" />

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full outline-none bg-transparent"
            />

            <IoEyeOutline className="text-gray-500 text-xl cursor-pointer hover:text-blue-600 transition" />

          </div>
        </div>

        {/* Remember & Forgot */}
        <div className="flex justify-between items-center mb-6 text-sm">

          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">

            <input
              type="checkbox"
              className="accent-blue-600"
            />

            Remember Me

          </label>

          <a
            href="#"
            className="text-blue-600 hover:underline font-medium"
          >
            Forgot Password?
          </a>

        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 transition duration-300">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-7">

          <hr className="flex-1 border-gray-300" />

          <span className="px-4 text-gray-500 font-medium">
            OR
          </span>

          <hr className="flex-1 border-gray-300" />

        </div>

        {/* Google Button */}
        <button className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-3">

          <FaGoogle className="text-red-500 text-lg" />

          Continue with Google

        </button>

        {/* Register */}
        <p className="text-center mt-7 text-gray-600">

          Don't have an account?{" "}

          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Register
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;