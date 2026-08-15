import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Business Analyst",
    review:
      "BusinessIQ AI helped our team predict sales with impressive accuracy. The dashboard is intuitive and saves us hours every week.",
  },
  {
    name: "Priya Reddy",
    role: "Data Scientist",
    review:
      "The fraud detection and customer analytics modules are easy to use and provide valuable business insights.",
  },
  {
    name: "Arjun Kumar",
    role: "Startup Founder",
    review:
      "A clean interface with powerful AI features. BusinessIQ AI has become an essential part of our workflow.",
  },
];

function Testimonials() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold mt-4 text-slate-900">
            What Our Clients Say
          </h2>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
            Trusted by professionals and businesses to make smarter decisions
            using AI-powered analytics.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-slate-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              <div className="flex gap-1 text-yellow-400 mb-5">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600 leading-7">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h3 className="font-bold text-xl">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;