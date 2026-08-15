import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function FraudChart({ fraud = 0, legitimate = 0 }) {
  const data = [
    {
      name: "Legitimate",
      value: Number(legitimate),
    },
    {
      name: "Fraud",
      value: Number(fraud),
    },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 mt-8">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          📊 Fraud Distribution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Distribution of legitimate and suspicious transactions
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={4}
              label={({ name, value }) =>
                `${name}: ${value}`
              }
            >

              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default FraudChart;