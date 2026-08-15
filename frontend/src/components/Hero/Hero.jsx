import { Link } from "react-router-dom";
import DashboardPreview from "../DashboardPreview/DashboardPreview";
import { FaArrowRight, FaPlay } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[90vh] flex items-center">

      {/* Background Blur */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 opacity-20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-20 w-80 h-80 bg-indigo-300 opacity-20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28 grid lg:grid-cols-2 gap-24 items-center relative z-10">

        {/* LEFT */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold shadow-sm">
            🚀 AI Powered Business Intelligence
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-slate-900">
            Turn Business Data
            <span className="block text-blue-600">
              Into Smart Decisions
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">
            Predict sales, detect fraud, analyze customer sentiment,
            and unlock valuable business insights using Artificial
            Intelligence — all from one intelligent platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">

            {/* Start Free */}
            <Link
              to="/register"
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Free
              <FaArrowRight />
            </Link>

            {/* View Dashboard */}
            <Link
              to="/dashboard"
              className="flex items-center gap-3 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              <FaPlay />
              View Dashboard
            </Link>

          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-5 mt-16">

            <div className="bg-white rounded-2xl shadow-md p-5 text-center">
              <h2 className="text-3xl font-bold text-blue-600">
                500+
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Businesses
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 text-center">
              <h2 className="text-3xl font-bold text-blue-600">
                99%
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                AI Accuracy
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 text-center">
              <h2 className="text-3xl font-bold text-blue-600">
                24/7
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Support
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <DashboardPreview />
        </div>

      </div>

    </section>
  );
}

export default Hero;