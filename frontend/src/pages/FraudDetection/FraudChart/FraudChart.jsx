import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function FraudChart({ fraud = 0, legitimate = 0 }) {
  const fraudCount = Number(fraud) || 0;
  const legitimateCount = Number(legitimate) || 0;

  const totalTransactions = fraudCount + legitimateCount;

  const fraudPercentage =
    totalTransactions > 0
      ? (fraudCount / totalTransactions) * 100
      : 0;

  const legitimatePercentage =
    totalTransactions > 0
      ? (legitimateCount / totalTransactions) * 100
      : 0;

  const data = [
    {
      name: "Legitimate",
      value: legitimateCount,
    },
    {
      name: "Fraud",
      value: fraudCount,
    },
  ];

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl">
              🛡️
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Fraud Distribution
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Transaction risk classification overview
              </p>

            </div>

          </div>

        </div>

        <div className="w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2">

          <span className="text-sm font-semibold text-slate-600">
            {totalTransactions.toLocaleString("en-IN")} Transactions
          </span>

        </div>

      </div>

      {/* Main Chart */}
      <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">

        {/* Pie */}
        <div className="relative h-80">

          {totalTransactions > 0 ? (

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={115}
                  paddingAngle={3}
                  strokeWidth={0}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                  labelLine={false}
                >

                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index]}
                    />
                  ))}

                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    Number(value).toLocaleString("en-IN"),
                    name,
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 10px 25px rgba(15, 23, 42, 0.08)",
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />

              </PieChart>

            </ResponsiveContainer>

          ) : (

            <div className="flex h-full items-center justify-center">

              <div className="text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  📊
                </div>

                <p className="mt-3 font-semibold text-slate-700">
                  No transaction data
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Upload a dataset to begin analysis.
                </p>

              </div>

            </div>

          )}

          {/* Center Metric */}
          {totalTransactions > 0 && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] text-center">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Fraud Rate
              </p>

              <p className="mt-1 text-3xl font-bold text-red-600">
                {fraudPercentage.toFixed(1)}%
              </p>

            </div>
          )}

        </div>

        {/* Analysis */}
        <div className="space-y-4">

          {/* Fraud */}
          <div className="rounded-xl border border-red-100 bg-red-50 p-5">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  🚨
                </div>

                <div>

                  <p className="text-sm font-medium text-red-600">
                    Suspicious Transactions
                  </p>

                  <p className="text-2xl font-bold text-red-700">
                    {fraudCount.toLocaleString("en-IN")}
                  </p>

                </div>

              </div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                {fraudPercentage.toFixed(1)}%
              </span>

            </div>

          </div>

          {/* Legitimate */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                  ✓
                </div>

                <div>

                  <p className="text-sm font-medium text-emerald-600">
                    Legitimate Transactions
                  </p>

                  <p className="text-2xl font-bold text-emerald-700">
                    {legitimateCount.toLocaleString("en-IN")}
                  </p>

                </div>

              </div>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                {legitimatePercentage.toFixed(1)}%
              </span>

            </div>

          </div>

          {/* Risk status */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="flex items-start gap-3">

              <span className="text-xl">
                💡
              </span>

              <div>

                <p className="font-semibold text-slate-800">
                  Risk Assessment
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">

                  {fraudPercentage === 0
                    ? "No suspicious transactions were detected in the analyzed dataset."
                    : fraudPercentage < 5
                    ? "The detected fraud rate is relatively low. Continue monitoring suspicious transactions."
                    : fraudPercentage < 15
                    ? "The dataset contains a noticeable level of suspicious activity. Further investigation is recommended."
                    : "A high proportion of transactions were flagged as suspicious. Immediate investigation is recommended."}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FraudChart;