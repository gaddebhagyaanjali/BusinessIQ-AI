import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PredictionChart({ predictions = [] }) {
  if (!Array.isArray(predictions) || predictions.length === 0) {
    return null;
  }

  const chartData = predictions.map((item, index) => ({
    day: `Day ${item.day ?? index + 1}`,
    sales: Number(item.predicted_sales) || 0,
  }));

  return (
    <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">

      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">
          📈 Sales Forecast
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Predicted sales for the selected forecast period.
        </p>
      </div>

      {/* CHART */}
      <div className="h-[400px] w-full">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) =>
                Number(value).toFixed(0)
              }
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
                "Predicted Sales",
              ]}
            />

            <Line
              type="monotone"
              dataKey="sales"
              name="Predicted Sales"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PredictionChart;