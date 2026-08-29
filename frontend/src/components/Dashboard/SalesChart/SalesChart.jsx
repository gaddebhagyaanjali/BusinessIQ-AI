import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SalesChart({ data = [] }) {
  const totalSales = data.reduce(
    (sum, item) => sum + Number(item.sales || 0),
    0
  );

  const topCategory =
    data.length > 0
      ? data.reduce((top, item) =>
          Number(item.sales || 0) > Number(top.sales || 0) ? item : top
        )
      : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
              📊
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Sales Analytics
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Sales performance by category
              </p>
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 self-start rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-emerald-700">
            Live data
          </span>
        </div>

      </div>

      {/* Summary */}
      {data.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total sales
            </p>

            <p className="mt-1 text-lg font-bold text-slate-800">
              ₹
              {totalSales.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-blue-400">
              Top category
            </p>

            <p className="mt-1 truncate text-lg font-bold text-blue-700">
              {topCategory?.category || "N/A"}
            </p>
          </div>

        </div>
      )}

      {/* Chart */}
      <div className="mt-6 h-80">

        {data.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
              barCategoryGap="28%"
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                tickFormatter={(value) =>
                  `₹${(value / 1000).toFixed(0)}K`
                }
              />

              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                }}
                labelStyle={{
                  color: "#334155",
                  fontWeight: 600,
                }}
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  "Sales",
                ]}
              />

              <Bar
                dataKey="sales"
                name="Sales"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
                maxBarSize={70}
              />

            </BarChart>

          </ResponsiveContainer>

        ) : (

          <div className="flex h-full flex-col items-center justify-center rounded-xl bg-slate-50">

            <div className="text-4xl">📊</div>

            <p className="mt-3 font-semibold text-slate-700">
              No sales data available
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Connect your business data to view analytics.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default SalesChart;