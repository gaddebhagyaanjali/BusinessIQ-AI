import { useState } from "react";

function Reports() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // ==========================================
  // FILE SELECTION
  // ==========================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError("");
    setResult(null);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file only.");
      setSelectedFile(null);
      setFileName("");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  // ==========================================
  // GENERATE REPORT
  // ==========================================

  const handleGenerateReport = async () => {
    if (!selectedFile) {
      setError("Please upload a CSV file first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch(
        "http://127.0.0.1:8000/api/reports/generate",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Report Response:", data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Report generation failed."
        );
      }

      if (data.status === "error") {
        setError(
          data.message || "Report generation failed."
        );
        return;
      }

      setResult(data);

    } catch (err) {
      console.error("Report Error:", err);

      setError(
        err.message ||
          "Unable to connect to the reports backend."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          📄 Business Reports
        </h1>

        <p className="mt-2 text-gray-500">
          Generate a business intelligence report from your CSV dataset.
        </p>
      </div>


      {/* ==========================================
          UPLOAD CARD
      ========================================== */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Upload Dataset
        </h2>

        <label
          htmlFor="reportFile"
          className="flex flex-col items-center justify-center
          border-2 border-dashed border-blue-400
          rounded-2xl p-10 cursor-pointer
          hover:bg-blue-50 transition"
        >
          <div className="text-5xl">
            📂
          </div>

          <p className="mt-4 text-lg font-semibold text-slate-700">
            Click to Upload CSV
          </p>

          <p className="text-gray-500">
            CSV files only
          </p>
        </label>

        <input
          id="reportFile"
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />


        {/* SELECTED FILE */}

        {fileName && (
          <div
            className="mt-5 flex items-center justify-between
            rounded-xl bg-blue-50 border border-blue-200 p-4"
          >
            <div>
              <p className="text-sm text-gray-500">
                Selected File
              </p>

              <p className="font-semibold text-blue-700">
                {fileName}
              </p>
            </div>

            <span className="text-2xl">
              📄
            </span>
          </div>
        )}


        {/* ERROR */}

        {error && (
          <div
            className="mt-5 rounded-xl border border-red-300
            bg-red-50 p-4 text-red-700"
          >
            <p className="font-semibold">
              ⚠️ Report Generation Error
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>
        )}


        {/* BUTTON */}

        <button
          type="button"
          onClick={handleGenerateReport}
          disabled={loading}
          className={`mt-6 px-8 py-3 rounded-xl
            font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
        >
          {loading
            ? "⏳ Generating Report..."
            : "📊 Generate Report"}
        </button>

      </div>


      {/* ==========================================
          REPORT RESULTS
      ========================================== */}

      {result && (
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            📊 Business Report
          </h2>


          {/* SUMMARY CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Total Rows
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {result.total_rows}
              </p>
            </div>


            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Total Columns
              </p>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {result.total_columns}
              </p>
            </div>


            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Total Sales
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                ${Number(result.total_sales).toLocaleString()}
              </p>
            </div>


            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Average Sales
              </p>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                ${Number(result.average_sales).toLocaleString()}
              </p>
            </div>

          </div>


          {/* BUSINESS INFORMATION */}

          <div className="mt-6 bg-slate-50 rounded-2xl p-5">

            <h3 className="font-bold text-slate-700 mb-4">
              📈 Business Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Dataset
                </p>

                <p className="font-semibold text-slate-800">
                  {result.filename}
                </p>
              </div>


              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Total Customers
                </p>

                <p className="text-xl font-bold text-blue-600">
                  {result.total_customers}
                </p>
              </div>


              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Fraud Transactions
                </p>

                <p className="text-xl font-bold text-red-600">
                  {result.fraud_transactions}
                </p>
              </div>

            </div>

          </div>


          {/* FRAUD INFORMATION */}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Fraud Percentage
              </p>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {result.fraud_percentage}%
              </p>
            </div>


            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Dataset Status
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {result.dataset_status || "Ready"}
              </p>
            </div>

          </div>


          {/* FRAUD THRESHOLD */}

          {result.fraud_threshold !== undefined && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Fraud Detection Threshold
              </p>

              <p className="text-2xl font-bold text-yellow-600 mt-2">
                ${Number(
                  result.fraud_threshold
                ).toLocaleString()}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Transactions above this value are considered suspicious.
              </p>

            </div>
          )}


          {/* AMOUNT COLUMN */}

          {result.amount_column && (
            <div className="mt-4 text-sm text-gray-500">
              Amount column used for fraud detection:{" "}
              <span className="font-semibold text-slate-700">
                {result.amount_column}
              </span>
            </div>
          )}


          {/* DATASET COLUMNS */}

          {result.columns?.length > 0 && (
            <div className="mt-6">

              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Dataset Columns
              </h3>

              <div className="flex flex-wrap gap-2">

                {result.columns.map(
                  (column, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100
                      px-3 py-1 text-sm text-blue-700"
                    >
                      {column}
                    </span>
                  )
                )}

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Reports;