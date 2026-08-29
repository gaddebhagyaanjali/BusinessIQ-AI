import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CTA() {
  return (
    <section className="py-28 bg-gradient-to-r from-blue-600 to-indigo-700">

      <div className="max-w-6xl mx-auto px-8 text-center text-white">

        <h2 className="text-5xl font-bold">
          Ready to Transform Your Business?
        </h2>

        <p className="mt-6 text-blue-100 text-lg max-w-3xl mx-auto leading-8">
          Join hundreds of businesses using AI-powered analytics to predict
          sales, detect fraud, understand customers, and make smarter
          business decisions.
        </p>

        <div className="mt-10 flex justify-center gap-5 flex-wrap">

          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition duration-300"
          >
            Start Free
          </Link>

          <Link
            to="/login"
            className="border-2 border-white px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Login
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </section>
  );
}

export default CTA;