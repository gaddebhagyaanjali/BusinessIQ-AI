import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import UploadDataset from "../../components/SalesPrediction/UploadDataset/UploadDataset";
import DatasetPreview from "../../components/SalesPrediction/DatasetPreview/DatasetPreview";
import PredictionControls from "../../components/SalesPrediction/PredictionControls/PredictionControls";
import PredictionChart from "../../components/SalesPrediction/PredictionChart/PredictionChart";

function SalesPrediction() {
  const [csvData, setCsvData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Prediction response
  const [predictionResult, setPredictionResult] = useState(null);

  return (
    <DashboardLayout>

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          📈 Sales Prediction
        </h1>

        <p className="mt-2 text-gray-500">
          Upload your sales dataset and generate AI-powered
          sales predictions.
        </p>
      </div>


      {/* =====================================================
          UPLOAD DATASET
      ====================================================== */}

      <div className="mt-10">

        <UploadDataset
          setCsvData={setCsvData}
          setSelectedFile={setSelectedFile}
        />

      </div>


      {/* =====================================================
          DATASET PREVIEW
      ====================================================== */}

      {csvData.length > 0 && (
        <div className="mt-10">

          <DatasetPreview
            data={csvData}
          />

        </div>
      )}


      {/* =====================================================
          AI PREDICTION CONTROLS
      ====================================================== */}

      {csvData.length > 0 && selectedFile && (
        <div className="mt-10">

          <PredictionControls
            columns={Object.keys(csvData[0] || {})}
            selectedFile={selectedFile}
            onPredictionResult={setPredictionResult}
          />

        </div>
      )}


      {/* =====================================================
          PREDICTION RESULT
      ====================================================== */}

      {predictionResult && (
        <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">

          {/* =================================================
              RESULT HEADER
          ================================================== */}

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                📊 Prediction Result
              </h2>

              <p className="mt-1 text-gray-500">
                AI-generated sales forecast based on your dataset.
              </p>

            </div>

            <div className="rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              ✅ Prediction Generated
            </div>

          </div>


          {/* =================================================
              SUMMARY CARDS
          ================================================== */}

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

            {/* Target Column */}

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

              <p className="text-sm font-medium text-gray-500">
                Target Column
              </p>

              <p className="mt-2 text-xl font-bold text-blue-700">
                {predictionResult.target_column || "Sales"}
              </p>

            </div>


            {/* Algorithm */}

            <div className="rounded-xl border border-purple-100 bg-purple-50 p-5">

              <p className="text-sm font-medium text-gray-500">
                Algorithm
              </p>

              <p className="mt-2 text-xl font-bold text-purple-700">
                {predictionResult.algorithm ||
                  "Linear Regression"}
              </p>

            </div>


            {/* Prediction Period */}

            <div className="rounded-xl border border-green-100 bg-green-50 p-5">

              <p className="text-sm font-medium text-gray-500">
                Prediction Period
              </p>

              <p className="mt-2 text-xl font-bold text-green-700">
                {predictionResult.period ||
                  `${predictionResult.forecast_days || 0} Days`}
              </p>

            </div>

          </div>


          {/* =================================================
              FORECAST CHART
          ================================================== */}

          {predictionResult.predictions &&
            predictionResult.predictions.length > 0 && (

              <PredictionChart
                predictions={predictionResult.predictions}
              />

            )}


          {/* =================================================
              FORECAST TABLE
          ================================================== */}

          {predictionResult.predictions &&
            predictionResult.predictions.length > 0 && (

              <div className="mt-8">

                <div className="mb-4">

                  <h3 className="text-xl font-bold text-slate-800">
                    📋 Forecast Details
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Detailed predicted sales for each forecast day.
                  </p>

                </div>


                <div className="overflow-hidden rounded-xl border border-gray-200">

                  <div className="max-h-[500px] overflow-y-auto">

                    <table className="w-full border-collapse">

                      <thead className="sticky top-0 bg-slate-100">

                        <tr>

                          <th className="border-b border-gray-200 p-4 text-left text-sm font-semibold text-slate-700">
                            Day
                          </th>

                          <th className="border-b border-gray-200 p-4 text-left text-sm font-semibold text-slate-700">
                            Predicted Sales
                          </th>

                        </tr>

                      </thead>


                      <tbody>

                        {predictionResult.predictions.map(
                          (prediction, index) => {

                            const salesValue =
                              Number(
                                prediction.predicted_sales
                              ) || 0;

                            return (
                              <tr
                                key={
                                  prediction.day ??
                                  index
                                }
                                className="transition hover:bg-slate-50"
                              >

                                <td className="border-b border-gray-100 p-4 text-slate-700">
                                  Day{" "}
                                  {prediction.day ??
                                    index + 1}
                                </td>

                                <td className="border-b border-gray-100 p-4 font-semibold text-blue-600">
                                  {salesValue.toFixed(2)}
                                </td>

                              </tr>
                            );
                          }
                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            )}


          {/* =================================================
              FORECAST SUMMARY
          ================================================== */}

          {predictionResult.predictions &&
            predictionResult.predictions.length > 0 && (

              <div className="mt-6 flex flex-wrap gap-4">

                {/* Forecast Days */}

                <div className="rounded-xl bg-slate-100 px-5 py-3">

                  <p className="text-xs text-gray-500">
                    Forecast Days
                  </p>

                  <p className="text-lg font-bold text-slate-700">
                    {predictionResult.predictions.length}
                  </p>

                </div>


                {/* First Prediction */}

                <div className="rounded-xl bg-blue-50 px-5 py-3">

                  <p className="text-xs text-gray-500">
                    First Prediction
                  </p>

                  <p className="text-lg font-bold text-blue-700">
                    {Number(
                      predictionResult.predictions[0]
                        ?.predicted_sales || 0
                    ).toFixed(2)}
                  </p>

                </div>


                {/* Last Prediction */}

                <div className="rounded-xl bg-green-50 px-5 py-3">

                  <p className="text-xs text-gray-500">
                    Last Prediction
                  </p>

                  <p className="text-lg font-bold text-green-700">
                    {Number(
                      predictionResult.predictions[
                        predictionResult.predictions.length - 1
                      ]?.predicted_sales || 0
                    ).toFixed(2)}
                  </p>

                </div>

              </div>

            )}

        </div>
      )}

    </DashboardLayout>
  );
}

export default SalesPrediction;