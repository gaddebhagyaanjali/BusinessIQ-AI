import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

function CustomerChart({ data = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            👥 Customer Analytics
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Customer distribution by segment
          </p>
        </div>

        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
          {data.length} Segments
        </div>

      </div>

      {/* Pie Chart */}
      <div className="h-80">

        {data.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={55}
                paddingAngle={4}
                label={({ name, value }) =>
                  `${name}: ${Number(value).toFixed(1)}%`
                }
              >

                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip
                formatter={(value) =>
                  [`${Number(value).toFixed(2)}%`, "Share"]
                }
              />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        ) : (

          <div className="h-full flex items-center justify-center text-gray-500">
            No customer segment data available.
          </div>

        )}

      </div>

    </div>
  );
}

export default CustomerChart;