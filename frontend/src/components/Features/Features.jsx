import {
  FaChartLine,
  FaShieldAlt,
  FaSmile,
  FaUsers,
  FaFileAlt,
  FaRobot,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine className="text-4xl text-blue-600" />,
    title: "Sales Prediction",
    description:
      "Forecast future sales using AI-powered machine learning models.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-red-500" />,
    title: "Fraud Detection",
    description:
      "Identify suspicious transactions instantly with intelligent monitoring.",
  },
  {
    icon: <FaSmile className="text-4xl text-yellow-500" />,
    title: "Sentiment Analysis",
    description:
      "Understand customer feedback using Natural Language Processing.",
  },
  {
    icon: <FaUsers className="text-4xl text-green-500" />,
    title: "Customer Segmentation",
    description:
      "Group customers based on purchasing behavior and demographics.",
  },
  {
    icon: <FaFileAlt className="text-4xl text-indigo-500" />,
    title: "Business Reports",
    description:
      "Generate smart reports with interactive visualizations and KPIs.",
  },
  {
    icon: <FaRobot className="text-4xl text-purple-500" />,
    title: "AI Assistant",
    description:
      "Receive intelligent recommendations to support better decisions.",
  },
];

function Features() {
  return (
    <section className="py-28 bg-slate-50" id="features">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Features
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            Powerful AI Solutions
          </h2>

          <p className="text-gray-500 mt-6 max-w-3xl mx-auto text-lg">
            Everything you need to transform raw business data into
            meaningful insights using Artificial Intelligence.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
            >

              <div className="mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;