import {
  FaChartLine,
  FaShieldAlt,
  FaSmile,
  FaUsers,
} from "react-icons/fa";

import ServiceCard from "./ServiceCard";

function Services() {
  return (
    <section className="bg-slate-100 py-20">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Our AI Services
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Powerful AI tools designed to help businesses make smarter decisions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <ServiceCard
            icon={<FaChartLine className="text-blue-600" />}
            title="Sales Prediction"
            description="Predict future sales trends using Machine Learning algorithms."
          />

          <ServiceCard
            icon={<FaShieldAlt className="text-red-500" />}
            title="Fraud Detection"
            description="Identify suspicious financial transactions using AI."
          />

          <ServiceCard
            icon={<FaSmile className="text-yellow-500" />}
            title="Sentiment Analysis"
            description="Understand customer opinions from reviews and feedback."
          />

          <ServiceCard
            icon={<FaUsers className="text-green-500" />}
            title="Customer Segmentation"
            description="Group customers into meaningful clusters for marketing."
          />

        </div>

      </div>

    </section>
  );
}

export default Services;