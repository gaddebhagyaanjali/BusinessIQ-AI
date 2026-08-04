import heroImage from "../../assets/hero.png";

function Hero() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 items-center gap-12">

        {/* Left Content */}
        <div>

          <span className="text-blue-600 font-semibold">
            🚀 AI Powered Business Analytics Platform
          </span>

          <h1 className="text-5xl font-bold text-slate-900 mt-4 leading-tight">
            Transform Your Business Data Into Smart Decisions
          </h1>

          <p className="text-gray-600 mt-6 text-lg leading-8">
            BusinessIQ AI helps businesses analyze sales,
            detect fraud, understand customer sentiment,
            and generate AI-powered insights through an
            interactive dashboard.
          </p>

          <div className="flex gap-5 mt-8">

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl">
              Get Started
            </button>

            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 transition px-6 py-3 rounded-xl">
              Explore Dashboard
            </button>

          </div>

        </div>

        {/* Right Image */}

        <div className="flex justify-center">

          <img
            src={heroImage}
            alt="Business Dashboard"
            className="w-full max-w-lg"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;