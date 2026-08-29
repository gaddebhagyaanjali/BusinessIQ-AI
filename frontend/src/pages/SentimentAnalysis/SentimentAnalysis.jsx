import { useState } from "react";

function SentimentAnalysis() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/sentiment/analyze`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
    }),
  }
);

      const data = await response.json();

      console.log("Sentiment Response:", data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Sentiment analysis failed."
        );
      }

      if (data.status === "error") {
        setError(
          data.message || "Sentiment analysis failed."
        );
        return;
      }

      setResult(data);

    } catch (err) {
      console.error("Sentiment Analysis Error:", err);

      setError(
        err.message ||
          "Unable to connect to the sentiment analysis backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const getSentimentStyle = () => {
    if (!result) return "";

    if (result.sentiment === "Positive") {
      return "bg-green-50 border-green-200 text-green-700";
    }

    if (result.sentiment === "Negative") {
      return "bg-red-50 border-red-200 text-red-700";
    }

    return "bg-yellow-50 border-yellow-200 text-yellow-700";
  };

  const getSentimentEmoji = () => {
    if (!result) return "😊";

    if (result.sentiment === "Positive") {
      return "😊";
    }

    if (result.sentiment === "Negative") {
      return "😞";
    }

    return "😐";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          😊 Sentiment Analysis
        </h1>

        <p className="mt-2 text-gray-500">
          Analyze customer feedback and determine whether
          the sentiment is positive, negative, or neutral.
        </p>
      </div>


      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Enter Customer Feedback
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: I really love this product. It is amazing!"
          rows="6"
          className="w-full rounded-xl border border-gray-300 p-4
          text-slate-700 outline-none
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* Character Count */}
        <div className="mt-2 text-right text-sm text-gray-400">
          {text.length} characters
        </div>


        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-300
            bg-red-50 p-4 text-red-700">

            <p className="font-semibold">
              ⚠️ Analysis Error
            </p>

            <p className="mt-1">
              {error}
            </p>

          </div>
        )}


        {/* Analyze Button */}
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className={`mt-5 px-8 py-3 rounded-xl
            font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
        >
          {loading
            ? "⏳ Analyzing..."
            : "🔍 Analyze Sentiment"}
        </button>

      </div>


      {/* Result */}
      {result && (
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            📊 Sentiment Result
          </h2>


          {/* Sentiment */}
          <div
            className={`rounded-2xl border p-6 ${getSentimentStyle()}`}
          >

            <p className="text-sm font-semibold">
              Detected Sentiment
            </p>

            <div className="flex items-center gap-3 mt-2">

              <span className="text-4xl">
                {getSentimentEmoji()}
              </span>

              <h3 className="text-3xl font-bold">
                {result.sentiment}
              </h3>

            </div>

          </div>


          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

            {/* Polarity */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Polarity
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {result.polarity}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Measures how positive or negative the text is.
              </p>

            </div>


            {/* Subjectivity */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Subjectivity
              </p>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {result.subjectivity}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Measures how subjective or opinion-based the text is.
              </p>

            </div>

          </div>


          {/* Original Text */}
          <div className="mt-6 bg-slate-50 rounded-2xl p-5">

            <p className="text-sm font-semibold text-gray-500">
              Analyzed Text
            </p>

            <p className="mt-2 text-slate-700">
              {result.text}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default SentimentAnalysis;