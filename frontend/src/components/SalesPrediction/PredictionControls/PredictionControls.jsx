import { useState } from "react";

function PredictionControls({
  columns = [],
  selectedFile = null,
  onPredictionResult,
}) {
  const [targetColumn, setTargetColumn] = useState("");
  const [algorithm, setAlgorithm] = useState("Linear Regression");
  const [period, setPeriod] = useState("30 Days");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // PREDICT SALES
  // =====================================================

  const handlePredict = async () => {
    setError("");

    // Check file
    if (!selectedFile) {
      setError("Please upload a CSV file first.");
      return;
    }

    // Check target column
    if (!targetColumn) {
      setError("Please select a target column.");
      return;
    }

    setLoading(true);

    try {
      // =================================================
      // CREATE FORM DATA
      // =================================================

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("target_column", targetColumn);
      formData.append("algorithm", algorithm);
      formData.append("period", period);

      console.log("=================================");
      console.log("Sales Prediction Request");
      console.log("File:", selectedFile.name);
      console.log("Target Column:", targetColumn);
      console.log("Algorithm:", algorithm);
      console.log("Period:", period);
      console.log("=================================");

      // =================================================
      // CALL FASTAPI
      // =================================================

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/sales-prediction/predict`,
  {
    method: "POST",
    body: formData,
  }
);

      // =================================================
      // READ RESPONSE
      // =================================================

      const data = await response.json();

      console.log("Prediction API Response:", data);

      // =================================================
      // HANDLE HTTP ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.message ||
            `Prediction failed with status ${response.status}`
        );
      }

      // =================================================
      // HANDLE BACKEND ERROR
      // =================================================

      if (data.status === "error") {
        throw new Error(
          data.message ||
            "Prediction could not be generated."
        );
      }

      // =================================================
      // VALIDATE RESPONSE
      // =================================================

      if (
        !data.predictions ||
        !Array.isArray(data.predictions)
      ) {
        throw new Error(
          "Prediction response does not contain valid prediction data."
        );
      }

      if (!data.summary) {
        throw new Error(
          "Prediction summary was not returned by the backend."
        );
      }

      // =================================================
      // SEND RESULT TO PARENT COMPONENT
      // =================================================

      if (onPredictionResult) {
        onPredictionResult(data);
      }

    } catch (err) {
      console.error(
        "Sales Prediction Error:",
        err
      );

      setError(
        err.message ||
          "Unable to connect to the prediction backend."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          🤖 AI Sales Prediction
        </h2>

        <p className="mt-2 text-gray-500">
          Select the target column, machine learning
          algorithm and prediction period.
        </p>

      </div>

      {/* =================================================
          CONTROLS
      ================================================= */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Target Column */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Target Column
          </label>

          <select
            value={targetColumn}
            onChange={(e) => {
              setTargetColumn(e.target.value);
              setError("");
            }}
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              Select Column
            </option>

            {columns.map((column) => (

              <option
                key={column}
                value={column}
              >
                {column}
              </option>

            ))}

          </select>

          {targetColumn && (

            <p className="mt-2 text-sm text-green-600">
              ✓ Selected: {targetColumn}
            </p>

          )}

        </div>

        {/* Algorithm */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Algorithm
          </label>

          <select
            value={algorithm}
            onChange={(e) =>
              setAlgorithm(e.target.value)
            }
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="Linear Regression">
              Linear Regression
            </option>

            <option value="Random Forest">
              Random Forest
            </option>

            <option value="XGBoost">
              XGBoost
            </option>

          </select>

        </div>

        {/* Prediction Period */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Prediction Period
          </label>

          <select
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value)
            }
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="7 Days">
              7 Days
            </option>

            <option value="30 Days">
              30 Days
            </option>

            <option value="90 Days">
              90 Days
            </option>

          </select>

        </div>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4">

          <p className="font-semibold text-red-700">
            ⚠️ Prediction Error
          </p>

          <p className="mt-1 text-red-600">
            {error}
          </p>

        </div>

      )}

      {/* =================================================
          PREDICT BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={handlePredict}
        disabled={loading || !selectedFile}
        className={`mt-8 rounded-xl px-8 py-3 font-semibold text-white transition-all ${
          loading || !selectedFile
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
        }`}
      >

        {loading
          ? "⏳ Generating Prediction..."
          : "🚀 Predict Sales"}

      </button>

      {/* =================================================
          FILE STATUS
      ================================================= */}

      {!selectedFile && (

        <p className="mt-3 text-sm text-gray-500">
          Upload a CSV dataset before generating predictions.
        </p>

      )}

      {selectedFile && (

        <p className="mt-3 text-sm text-green-600">
          ✓ Dataset ready: {selectedFile.name}
        </p>

      )}

    </div>
  );
}

export default PredictionControls;