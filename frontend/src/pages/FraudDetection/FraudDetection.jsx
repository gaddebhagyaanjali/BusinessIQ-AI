import { useState } from "react";

function FraudDetection() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // =====================================================
  // FILE SELECTION
  // =====================================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setError("");
    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // =====================================================
  // FRAUD DETECTION API
  // =====================================================

  const handleDetectFraud = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/fraud/detect`,
  {
    method: "POST",
    body: formData,
  }
);

      const data = await response.json();

      console.log("Fraud Detection Response:", data);

      if (!response.ok || data.status === "error") {
        throw new Error(
          data.message || "Fraud detection failed."
        );
      }

      setResult(data);
    } catch (err) {
      console.error("Fraud Detection Error:", err);

      setError(
        err.message ||
          "Unable to connect to the fraud detection backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          🛡️ Fraud Detection
        </h1>

        <p className="mt-2 text-gray-500">
          Upload transaction data and detect suspicious
          transactions using AI.
        </p>
      </div>

      {/* =================================================
          UPLOAD CARD
      ================================================= */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Upload Transaction Dataset
        </h2>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full rounded-xl border border-gray-300 p-3"
        />

        {/* Selected File */}

        {file && (
          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4">

            <p className="font-semibold text-blue-700">
              Selected File
            </p>

            <p className="text-gray-600 mt-1">
              {file.name}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024).toFixed(2)} KB
            </p>

          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">

            <p className="font-semibold">
              ⚠️ Error
            </p>

            <p className="mt-1">
              {error}
            </p>

          </div>
        )}

        {/* Detect Button */}

        <button
          type="button"
          onClick={handleDetectFraud}
          disabled={loading || !file}
          className={`mt-5 px-8 py-3 rounded-xl font-semibold text-white transition ${
            loading || !file
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 hover:shadow-lg"
          }`}
        >
          {loading
            ? "⏳ Detecting..."
            : "🔍 Detect Fraud"}
        </button>

      </div>

      {/* =================================================
          RESULTS
      ================================================= */}

      {result && (
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            📊 Fraud Detection Results
          </h2>

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Total Transactions */}

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Total Transactions
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {Number(
                  result.total_transactions || 0
                ).toLocaleString()}
              </p>

            </div>

            {/* Fraud Transactions */}

            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Fraud Transactions
              </p>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {Number(
                  result.fraud_transactions || 0
                ).toLocaleString()}
              </p>

            </div>

            {/* Legitimate Transactions */}

            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Legitimate Transactions
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {Number(
                  result.legitimate_transactions || 0
                ).toLocaleString()}
              </p>

            </div>

          </div>

          {/* =================================================
              ADDITIONAL INFORMATION
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

            {/* Fraud Percentage */}

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Fraud Percentage
              </p>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {Number(
                  result.fraud_percentage || 0
                ).toFixed(2)}
                %
              </p>

            </div>

            {/* Fraud Threshold */}

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Fraud Threshold
              </p>

              <p className="text-3xl font-bold text-yellow-600 mt-2">
                ₹
                {Number(
                  result.threshold || 0
                ).toLocaleString()}
              </p>

            </div>

            {/* Amount Column */}

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Amount Column
              </p>

              <p className="text-xl font-bold text-slate-700 mt-2">
                {result.amount_column || "N/A"}
              </p>

            </div>

          </div>

          {/* =================================================
              TRANSACTION ANALYSIS
          ================================================= */}

          <div className="mt-8">

            <div className="flex items-center justify-between mb-4">

              <h3 className="text-xl font-bold text-slate-800">
                Transaction Analysis
              </h3>

              <span className="text-sm text-gray-500">
                Showing first {result.results?.length || 0} transactions
              </span>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-slate-100 text-left">

                    <th className="p-3 border">
                      Transaction
                    </th>

                    <th className="p-3 border">
                      Amount
                    </th>

                    <th className="p-3 border">
                      Prediction
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {result.results?.length > 0 ? (

                    result.results.map((item) => (

                      <tr
                        key={item.transaction}
                        className="hover:bg-gray-50"
                      >

                        <td className="p-3 border">
                          {item.transaction}
                        </td>

                        <td className="p-3 border">
                          ₹
                          {Number(
                            item.amount || 0
                          ).toLocaleString()}
                        </td>

                        <td className="p-3 border">

                          {item.prediction === "Fraud" ? (

                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                              🚨 Fraud
                            </span>

                          ) : (

                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                              ✓ Legitimate
                            </span>

                          )}

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="3"
                        className="p-6 text-center text-gray-500"
                      >
                        No transaction results available.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default FraudDetection;