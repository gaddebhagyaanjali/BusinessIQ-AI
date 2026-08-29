import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
];

function CustomerChart({ data = [] }) {
  const total = data.reduce(
    (sum, item) => sum + Number(item.value || 0),
    0
  );

  const largestSegment =
    data.length > 0
      ? data.reduce((largest, item) =>
          Number(item.value || 0) > Number(largest.value || 0)
            ? item
            : largest
        )
      : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">
            👥
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Customer Analytics
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Customer distribution by segment
            </p>
          </div>

        </div>

        <div className="rounded-full bg-slate-100 px-3 py-1.5">
          <span className="text-xs font-semibold text-slate-600">
            {data.length} segments
          </span>
        </div>

      </div>

      {data.length > 0 ? (
        <>

          {/* Main analytics area */}
          <div className="mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-2">

            {/* Pie */}
            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={62}
                    outerRadius={95}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`customer-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      `${Number(value).toFixed(2)}%`,
                      "Customer share",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow:
                        "0 10px 25px rgba(15, 23, 42, 0.08)",
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* Center summary */}
            <div>

              <p className="text-sm font-medium text-slate-400">
                Largest segment
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                {largestSegment?.name || "N/A"}
              </h3>

              <p className="mt-1 text-3xl font-bold text-blue-600">
                {Number(largestSegment?.value || 0).toFixed(1)}%
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This segment represents the largest share of your
                customer distribution.
              </p>

            </div>

          </div>

          {/* Segment list */}
          <div className="mt-4 space-y-3 border-t border-slate-100 pt-5">

            {data.map((item, index) => (

              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-between"
              >

                <div className="flex items-center gap-3">

                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="text-sm font-medium text-slate-600">
                    {item.name}
                  </span>

                </div>

                <span className="text-sm font-bold text-slate-800">
                  {Number(item.value).toFixed(1)}%
                </span>

              </div>

            ))}

          </div>

          {/* Total */}
          <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">

            <div className="flex items-center justify-between">

              <span className="text-sm text-slate-500">
                Distribution total
              </span>

              <span className="font-bold text-slate-700">
                {total.toFixed(1)}%
              </span>

            </div>

          </div>

        </>
      ) : (

        <div className="mt-6 flex h-80 flex-col items-center justify-center rounded-xl bg-slate-50">

          <div className="text-4xl">
            👥
          </div>

          <p className="mt-3 font-semibold text-slate-700">
            No customer data available
          </p>

          <p className="mt-1 text-center text-sm text-slate-400">
            Customer segments will appear here once business data
            is connected.
          </p>

        </div>

      )}

    </div>
  );
}

export default CustomerChart;