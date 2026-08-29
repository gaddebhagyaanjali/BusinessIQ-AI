import { FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "What is BusinessIQ AI?",
    answer:
      "BusinessIQ AI is an AI-powered business analytics platform that helps organizations analyze data, predict sales, detect fraud, and gain valuable insights.",
  },
  {
    question: "Can I upload my own business data?",
    answer:
      "Yes. You can securely upload CSV files and analyze them using our AI-powered modules.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We follow industry-standard security practices to keep your data protected.",
  },
  {
    question: "Do I need coding knowledge?",
    answer:
      "No. BusinessIQ AI is designed for business users, analysts, and managers with an easy-to-use interface.",
  },
];

function FAQ() {
  return (
    <section className="py-28 bg-slate-50">

      <div className="max-w-5xl mx-auto px-8">

        <div className="text-center">

          <p className="text-blue-600 uppercase tracking-widest font-semibold">
            FAQ
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 mt-5">
            Find answers to the most common questions about BusinessIQ AI.
          </p>

        </div>

        <div className="mt-16 space-y-6">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >

              <div className="flex items-start gap-4">

                <FaQuestionCircle className="text-blue-600 text-2xl mt-1" />

                <div>

                  <h3 className="text-xl font-semibold text-slate-800">
                    {faq.question}
                  </h3>

                  <p className="text-gray-600 mt-3 leading-7">
                    {faq.answer}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;