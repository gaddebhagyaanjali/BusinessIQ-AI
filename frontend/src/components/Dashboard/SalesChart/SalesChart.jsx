import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function SalesChart({ data = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            📊 Sales Analytics
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Sales performance by category
          </p>
        </div>

        <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full font-semibold">
          Live Data
        </div>

      </div>

      {/* Chart */}
      <div className="h-80">

        {data.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="category"
                tick={{ fill: "#64748b" }}
              />

              <YAxis
                tick={{ fill: "#64748b" }}
              />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                }
              />

              <Legend />

              <Bar
                dataKey="sales"
                name="Sales"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        ) : (

          <div className="h-full flex items-center justify-center text-gray-500">
            No sales data available.
          </div>

        )}

      </div>

    </div>
  );
}

export default SalesChart;