import { FaChartLine, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-10">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-3">

            <FaChartLine className="text-blue-500 text-3xl"/>

            <h2 className="text-2xl font-bold">
              BusinessIQ AI
            </h2>

          </div>

          <p className="text-gray-400 mt-5 leading-7">
            AI-powered business intelligence platform helping organizations
            make smarter decisions through data.
          </p>

        </div>

        {/* Product */}

        <div>

          <h3 className="font-bold text-xl mb-5">
            Product
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>Dashboard</li>
            <li>Sales Prediction</li>
            <li>Fraud Detection</li>
            <li>Reports</li>

          </ul>

        </div>

        {/* Company */}

        <div>

          <h3 className="font-bold text-xl mb-5">
            Company
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>About</li>
            <li>Features</li>
            <li>Contact</li>
            <li>Privacy Policy</li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="font-bold text-xl mb-5">
            Connect
          </h3>

          <div className="flex gap-5 text-2xl">

            <FaGithub className="hover:text-blue-500 cursor-pointer"/>

            <FaLinkedin className="hover:text-blue-500 cursor-pointer"/>

            <FaEnvelope className="hover:text-blue-500 cursor-pointer"/>

          </div>

        </div>

      </div>

      <hr className="border-slate-700 my-10"/>

      <p className="text-center text-gray-500">
        © 2026 BusinessIQ AI. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;