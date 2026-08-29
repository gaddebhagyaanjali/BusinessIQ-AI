import {
  FaMicrosoft,
  FaAmazon,
  FaGoogle,
  FaApple,
} from "react-icons/fa";

function TrustedCompanies() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-widest text-blue-600 font-semibold">

            Trusted Worldwide

          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-4">

            Trusted by Innovative Companies

          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">

            BusinessIQ AI helps organizations make smarter decisions
            using Artificial Intelligence, predictive analytics and
            real-time business intelligence.

          </p>

        </div>

        {/* Company Logos */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">

          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col items-center hover:shadow-xl transition">

            <FaMicrosoft className="text-6xl text-blue-600" />

            <p className="mt-4 font-semibold text-slate-700">
              Microsoft
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col items-center hover:shadow-xl transition">

            <FaGoogle className="text-6xl text-red-500" />

            <p className="mt-4 font-semibold text-slate-700">
              Google
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col items-center hover:shadow-xl transition">

            <FaAmazon className="text-6xl text-orange-500" />

            <p className="mt-4 font-semibold text-slate-700">
              Amazon
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col items-center hover:shadow-xl transition">

            <FaApple className="text-6xl text-black" />

            <p className="mt-4 font-semibold text-slate-700">
              Apple
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default TrustedCompanies;