import { useState } from "react";

function CustomerAnalytics() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // =====================================================
  // FILE SELECTION
  // =====================================================

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setError("");
    setResult(null);

    if (!file) {
      setSelectedFile(null);
      setFileName("");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file only.");
      setSelectedFile(null);
      setFileName("");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  // =====================================================
  // CUSTOMER ANALYTICS API
  // =====================================================

  const handleAnalyzeCustomers = async () => {
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
  `${import.meta.env.VITE_API_URL}/api/customer/analyze`,
  {
    method: "POST",
    body: formData,
  }
);

      const data = await response.json();

      console.log("Customer Analytics Response:", data);

      if (!response.ok || data.status === "error") {
        throw new Error(
          data.message || "Customer analytics failed."
        );
      }

      setResult(data);
    } catch (err) {
      console.error("Customer Analytics Error:", err);

      setError(
        err.message ||
          "Unable to connect to the customer analytics backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
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
          👥 Customer Analytics
        </h1>

        <p className="mt-2 text-gray-500">
          Analyze customer transactions, sales performance,
          orders and purchasing behavior.
        </p>
      </div>

      {/* =================================================
          UPLOAD CARD
      ================================================= */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Upload Customer Dataset
        </h2>

        <label
          htmlFor="customerFile"
          className={`flex flex-col items-center justify-center
          border-2 border-dashed rounded-2xl p-10 transition ${
            loading
              ? "border-gray-300 bg-gray-50 cursor-not-allowed"
              : "border-blue-400 cursor-pointer hover:bg-blue-50"
          }`}
        >
          {loading ? (
            <>
              <div className="text-5xl">
                ⏳
              </div>

              <p className="mt-4 text-lg font-semibold text-slate-700">
                Analyzing Customers...
              </p>

              <p className="text-gray-500">
                Please wait while the backend analyzes the dataset.
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl">
                📂
              </div>

              <p className="mt-4 text-lg font-semibold text-slate-700">
                Click to Upload CSV
              </p>

              <p className="text-gray-500">
                Upload your customer transaction dataset
              </p>
            </>
          )}
        </label>

        <input
          id="customerFile"
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />

        {/* =================================================
            SELECTED FILE
        ================================================= */}

        {selectedFile && (
          <div className="mt-5 rounded-xl bg-blue-50 border border-blue-200 p-4">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Selected File
                </p>

                <p className="font-semibold text-blue-700">
                  {fileName}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <span className="text-3xl">
                📄
              </span>

            </div>

          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">

            <p className="font-semibold">
              ⚠️ Customer Analytics Error
            </p>

            <p className="mt-1">
              {error}
            </p>

          </div>
        )}

        {/* =================================================
            ANALYZE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleAnalyzeCustomers}
          disabled={loading || !selectedFile}
          className={`mt-6 px-8 py-3 rounded-xl
          font-semibold text-white transition ${
            loading || !selectedFile
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          {loading
            ? "⏳ Analyzing Customers..."
            : "📊 Analyze Customers"}
        </button>

      </div>

      {/* =================================================
          RESULTS
      ================================================= */}

      {result && (
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            📊 Customer Analytics Results
          </h2>

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* Total Customers */}

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Total Customers
              </p>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {Number(
                  result.total_customers || 0
                ).toLocaleString()}
              </p>

            </div>

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

            {/* Total Sales */}

            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Total Sales
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {formatCurrency(result.total_sales)}
              </p>

            </div>

            {/* Average Sales */}

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Average Sales / Customer
              </p>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                {formatCurrency(
                  result.average_sales_per_customer
                )}
              </p>

            </div>

          </div>

          {/* =================================================
              TOP CUSTOMER
          ================================================= */}

          <div className="mt-6 bg-slate-50 rounded-2xl p-5">

            <h3 className="font-bold text-slate-700 mb-4">
              🏆 Top Customer
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Customer */}

              <div className="bg-white rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Customer ID
                </p>

                <p className="text-lg font-bold text-blue-600 mt-1">
                  {result.top_customer || "N/A"}
                </p>

              </div>

              {/* Sales */}

              <div className="bg-white rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Total Sales
                </p>

                <p className="text-lg font-bold text-green-600 mt-1">
                  {formatCurrency(
                    result.top_customer_sales
                  )}
                </p>

              </div>

              {/* Dataset */}

              <div className="bg-white rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Dataset
                </p>

                <p className="text-lg font-bold text-slate-800 mt-1 break-all">
                  {result.filename || fileName}
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              CUSTOMER TABLE
          ================================================= */}

          {result.results?.length > 0 && (
            <div className="mt-8">

              <div className="flex items-center justify-between mb-4">

                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Customer Analysis
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Customers ranked by total sales.
                  </p>
                </div>

                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {result.results.length} records
                </span>

              </div>

              <div className="overflow-x-auto rounded-xl border">

                <table className="w-full text-sm">

                  <thead className="bg-slate-100">

                    <tr>

                      <th className="px-4 py-3 text-left">
                        Customer ID
                      </th>

                      <th className="px-4 py-3 text-left">
                        Total Orders
                      </th>

                      <th className="px-4 py-3 text-left">
                        Total Sales
                      </th>

                      <th className="px-4 py-3 text-left">
                        Average Order Value
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {result.results.map(
                      (item, index) => (
                        <tr
                          key={`${item.customer_id}-${index}`}
                          className="border-t hover:bg-slate-50"
                        >

                          <td className="px-4 py-3 font-semibold text-slate-700">
                            {item.customer_id}
                          </td>

                          <td className="px-4 py-3">
                            {Number(
                              item.total_orders || 0
                            ).toLocaleString()}
                          </td>

                          <td className="px-4 py-3 text-blue-600 font-semibold">
                            {formatCurrency(
                              item.total_sales
                            )}
                          </td>

                          <td className="px-4 py-3 text-green-600 font-semibold">
                            {formatCurrency(
                              item.average_order_value
                            )}
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* =================================================
              NO RESULTS
          ================================================= */}

          {(!result.results ||
            result.results.length === 0) && (
            <div className="mt-8 rounded-xl bg-gray-50 p-6 text-center text-gray-500">
              No customer analysis records available.
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default CustomerAnalytics;