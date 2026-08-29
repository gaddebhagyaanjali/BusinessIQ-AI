import { useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import FraudChart from "./FraudChart/FraudChart";

function FraudDetection() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // =====================================================
  // FILE SELECTION
  // =====================================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setError("");
    setResult(null);
    setSearch("");
    setFilter("All");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a valid CSV file.");
      setFile(null);
      return;
    }

    if (selectedFile.size === 0) {
      setError("The selected CSV file is empty.");
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
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        throw new Error(
          "Backend API URL is not configured. Please check your frontend .env file."
        );
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${apiUrl}/api/fraud/detect`,
        {
          method: "POST",
          body: formData,
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The backend returned an invalid response."
        );
      }

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
  // FILTER TRANSACTIONS
  // =====================================================

  const filteredTransactions = useMemo(() => {
    const transactions = result?.results || [];

    return transactions.filter((item) => {
      const transactionText = String(
        item.transaction ?? ""
      ).toLowerCase();

      const prediction = String(
        item.prediction ?? ""
      ).toLowerCase();

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        transactionText.includes(searchText);

      const matchesFilter =
        filter === "All" ||
        prediction === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [result, search, filter]);

  // =====================================================
  // NUMBER FORMATTERS
  // =====================================================

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-IN");

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // =====================================================
  // RISK STATUS
  // =====================================================

  const fraudPercentage = Number(
    result?.fraud_percentage || 0
  );

  const riskStatus =
    fraudPercentage === 0
      ? "No Risk"
      : fraudPercentage < 5
      ? "Low Risk"
      : fraudPercentage < 15
      ? "Moderate Risk"
      : "High Risk";

  const riskDescription =
    fraudPercentage === 0
      ? "No suspicious transactions were detected."
      : fraudPercentage < 5
      ? "The fraud rate is relatively low. Continue monitoring suspicious transactions."
      : fraudPercentage < 15
      ? "A noticeable level of suspicious activity was detected. Further investigation is recommended."
      : "A high proportion of transactions were flagged. Immediate investigation is recommended.";

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-3xl">
              🛡️
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Fraud Detection
              </h1>

              <p className="mt-1 text-gray-500">
                Detect suspicious transactions using AI-powered
                transaction analysis.
              </p>
            </div>

          </div>

          <div className="w-fit rounded-2xl border border-green-200 bg-green-50 px-5 py-3">

            <div className="flex items-center gap-2">

              <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

              <span className="font-semibold text-green-700">
                AI Engine Ready
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            UPLOAD SECTION
        ================================================= */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Upload Transaction Dataset
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Upload a CSV file containing transaction amounts
              for fraud analysis.
            </p>

          </div>


          <label
            htmlFor="fraud-file"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-red-400 hover:bg-red-50"
          >

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
              📁
            </div>

            <p className="text-lg font-semibold text-slate-700">
              Click to upload CSV
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Supported format: CSV
            </p>

            <input
              id="fraud-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>


          {/* SELECTED FILE */}

          {file && (
            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="font-semibold text-blue-700">
                  Selected Dataset
                </p>

                <p className="mt-1 text-gray-700">
                  {file.name}
                </p>

              </div>

              <div className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </div>

            </div>
          )}


          {/* ERROR */}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">

              <p className="font-semibold text-red-700">
                ⚠️ Analysis Error
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>

            </div>
          )}


          {/* BUTTON */}

          <button
            type="button"
            onClick={handleDetectFraud}
            disabled={loading || !file}
            className={`mt-6 w-full rounded-2xl px-6 py-4 font-bold text-white transition sm:w-auto ${
              loading || !file
                ? "cursor-not-allowed bg-gray-400"
                : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
            }`}
          >
            {loading
              ? "⏳ Analyzing Transactions..."
              : "🔍 Analyze for Fraud"}
          </button>

        </div>


        {/* =================================================
            RESULTS
        ================================================= */}

        {result && (
          <>

            {/* =================================================
                ANALYSIS OVERVIEW
            ================================================= */}

            <div>

              <div className="mb-5">

                <h2 className="text-2xl font-bold text-slate-800">
                  Analysis Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  AI analysis results from the uploaded dataset.
                </p>

              </div>


              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {/* TOTAL */}

                <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                  <div className="flex items-center justify-between">

                    <p className="text-sm font-medium text-gray-500">
                      Total Transactions
                    </p>

                    <span className="text-2xl">
                      📊
                    </span>

                  </div>

                  <p className="mt-3 text-3xl font-bold text-blue-600">
                    {formatNumber(
                      result.total_transactions
                    )}
                  </p>

                </div>


                {/* FRAUD */}

                <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                  <div className="flex items-center justify-between">

                    <p className="text-sm font-medium text-gray-500">
                      Fraud Detected
                    </p>

                    <span className="text-2xl">
                      🚨
                    </span>

                  </div>

                  <p className="mt-3 text-3xl font-bold text-red-600">
                    {formatNumber(
                      result.fraud_transactions
                    )}
                  </p>

                </div>


                {/* LEGITIMATE */}

                <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                  <div className="flex items-center justify-between">

                    <p className="text-sm font-medium text-gray-500">
                      Legitimate
                    </p>

                    <span className="text-2xl">
                      ✓
                    </span>

                  </div>

                  <p className="mt-3 text-3xl font-bold text-green-600">
                    {formatNumber(
                      result.legitimate_transactions
                    )}
                  </p>

                </div>


                {/* FRAUD RATE */}

                <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                  <div className="flex items-center justify-between">

                    <p className="text-sm font-medium text-gray-500">
                      Fraud Rate
                    </p>

                    <span className="text-2xl">
                      📈
                    </span>

                  </div>

                  <p className="mt-3 text-3xl font-bold text-purple-600">
                    {fraudPercentage.toFixed(2)}%
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                CHART + DETECTION DETAILS
            ================================================= */}

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

              <div className="xl:col-span-2">

                <FraudChart
                  fraud={result.fraud_transactions}
                  legitimate={result.legitimate_transactions}
                />

              </div>


              {/* DETECTION DETAILS */}

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

                <h2 className="text-xl font-bold text-slate-800">
                  🤖 Detection Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Parameters used during analysis.
                </p>


                <div className="mt-6 space-y-4">

                  {/* AMOUNT COLUMN */}

                  <div className="rounded-2xl bg-slate-50 p-4">

                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Amount Column
                    </p>

                    <p className="mt-1 font-bold text-slate-700">
                      {result.amount_column || "N/A"}
                    </p>

                  </div>


                  {/* THRESHOLD */}

                  <div className="rounded-2xl bg-yellow-50 p-4">

                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Fraud Threshold
                    </p>

                    <p className="mt-1 text-xl font-bold text-yellow-600">
                      {formatCurrency(result.threshold)}
                    </p>

                  </div>


                  {/* RISK */}

                  <div
                    className={`rounded-2xl p-4 ${
                      riskStatus === "High Risk"
                        ? "bg-red-50"
                        : riskStatus === "Moderate Risk"
                        ? "bg-yellow-50"
                        : riskStatus === "Low Risk"
                        ? "bg-green-50"
                        : "bg-blue-50"
                    }`}
                  >

                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Risk Status
                    </p>

                    <p
                      className={`mt-1 text-xl font-bold ${
                        riskStatus === "High Risk"
                          ? "text-red-600"
                          : riskStatus === "Moderate Risk"
                          ? "text-yellow-600"
                          : riskStatus === "Low Risk"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {riskStatus}
                    </p>

                    <p className="mt-2 text-sm leading-5 text-gray-500">
                      {riskDescription}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                TRANSACTION TABLE
            ================================================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    Transaction Analysis
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Review transactions classified by the AI system.
                  </p>

                </div>

                <div className="text-sm text-gray-500">

                  Showing{" "}

                  <span className="font-semibold text-slate-700">
                    {filteredTransactions.length}
                  </span>{" "}

                  records

                </div>

              </div>


              {/* SEARCH + FILTER */}

              <div className="mt-6 flex flex-col gap-3 md:flex-row">

                <input
                  type="text"
                  placeholder="🔎 Search transaction..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <select
                  value={filter}
                  onChange={(event) =>
                    setFilter(event.target.value)
                  }
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >

                  <option value="All">
                    All Transactions
                  </option>

                  <option value="Fraud">
                    Fraud Only
                  </option>

                  <option value="Legitimate">
                    Legitimate Only
                  </option>

                </select>

              </div>


              {/* TABLE */}

              <div className="mt-6 overflow-x-auto">

                <table className="w-full min-w-[650px] border-collapse">

                  <thead>

                    <tr className="bg-slate-100 text-left">

                      <th className="rounded-l-xl p-4 text-sm font-semibold text-slate-600">
                        Transaction
                      </th>

                      <th className="p-4 text-sm font-semibold text-slate-600">
                        Amount
                      </th>

                      <th className="p-4 text-sm font-semibold text-slate-600">
                        Prediction
                      </th>

                      <th className="rounded-r-xl p-4 text-sm font-semibold text-slate-600">
                        Risk
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredTransactions.length > 0 ? (

                      filteredTransactions.map((item, index) => {

                        const isFraud =
                          String(item.prediction)
                            .toLowerCase() === "fraud";

                        return (
                          <tr
                            key={`${item.transaction}-${index}`}
                            className="border-b last:border-b-0 hover:bg-slate-50"
                          >

                            <td className="p-4 font-medium text-slate-700">
                              {item.transaction ?? "N/A"}
                            </td>

                            <td className="p-4 text-slate-600">
                              {formatCurrency(item.amount)}
                            </td>

                            <td className="p-4">

                              {isFraud ? (

                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                                  🚨 Fraud
                                </span>

                              ) : (

                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                  ✓ Legitimate
                                </span>

                              )}

                            </td>

                            <td className="p-4">

                              {isFraud ? (

                                <span className="font-semibold text-red-600">
                                  High Risk
                                </span>

                              ) : (

                                <span className="font-semibold text-green-600">
                                  Low Risk
                                </span>

                              )}

                            </td>

                          </tr>
                        );
                      })

                    ) : (

                      <tr>

                        <td
                          colSpan="4"
                          className="p-10 text-center text-gray-500"
                        >
                          No transactions match your
                          search/filter.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </>
        )}

      </div>
    </DashboardLayout>
  );
}

export default FraudDetection;

