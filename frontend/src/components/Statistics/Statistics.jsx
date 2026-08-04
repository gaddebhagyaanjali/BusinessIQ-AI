import StatCard from "./StatCard";

function Statistics() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          BusinessIQ AI in Numbers
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Delivering intelligent insights through AI-powered analytics.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <StatCard
            number="1000+"
            title="Predictions Generated"
          />

          <StatCard
            number="99%"
            title="Model Accuracy"
          />

          <StatCard
            number="24/7"
            title="AI Availability"
          />

          <StatCard
            number="4"
            title="AI Services"
          />

        </div>

      </div>

    </section>
  );
}

export default Statistics;