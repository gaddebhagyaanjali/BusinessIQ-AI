import PredictionChart from "../PredictionChart/PredictionChart";

function PredictionResult({ result }) {
  // No prediction result yet
  if (!result) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          📊 Prediction Result
        </h2>

        <div className="rounded-2xl bg-slate-100 p-8 text-center">
          <p className="text-gray-500">
            Upload a dataset and click{" "}
            <span className="font-semibold text-blue-600">
              Predict Sales
            </span>{" "}
            to generate a prediction.
          </p>
        </div>
      </div>
    );
  }

  // Backend prediction array
  const predictions = result.predictions || [];

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">

      {/* Header */}
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        📊 Prediction Result
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Target Column */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm text-gray-500">
            Target Column
          </p>

          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            {result.target_column || "Sales"}
          </h3>
        </div>

        {/* Algorithm */}
        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
          <p className="text-sm text-gray-500">
            Algorithm
          </p>

          <h3 className="mt-2 text-2xl font-bold text-purple-600">
            {result.algorithm || "N/A"}
          </h3>
        </div>

        {/* Prediction Period */}
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm text-gray-500">
            Prediction Period
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {result.period || "N/A"}
          </h3>
        </div>

      </div>

      {/* Model Information */}
      <div className="mt-6 rounded-2xl bg-slate-50 p-5">

        <div className="flex flex-col gap-3 md:flex-row md:justify-between">

          <p className="text-gray-600">
            <span className="font-semibold">
              Forecast Days:
            </span>{" "}
            {result.forecast || predictions.length}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold">
              Predictions Generated:
            </span>{" "}
            {predictions.length}
          </p>

        </div>

      </div>

      {/* Prediction Chart */}
      {predictions.length > 0 && (
        <PredictionChart
          predictions={predictions}
        />
      )}

      {/* Forecast Table */}
      {predictions.length > 0 && (
        <div className="mt-8">

          <h3 className="mb-4 text-xl font-bold text-slate-800">
            📋 Forecast Details
          </h3>

          <div className="max-h-[450px] overflow-auto rounded-xl border border-gray-200">

            <table className="w-full border-collapse">

              <thead className="sticky top-0 bg-slate-100">
                <tr>
                  <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                    Day
                  </th>

                  <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                    Predicted Sales
                  </th>
                </tr>
              </thead>

              <tbody>
                {predictions.map((item, index) => (
                  <tr
                    key={item.day ?? index}
                    className="hover:bg-blue-50"
                  >
                    <td className="border-b border-gray-200 px-4 py-3">
                      Day {item.day ?? index + 1}
                    </td>

                    <td className="border-b border-gray-200 px-4 py-3 font-semibold text-blue-600">
                      {Number(item.predicted_sales || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}

export default PredictionResult;