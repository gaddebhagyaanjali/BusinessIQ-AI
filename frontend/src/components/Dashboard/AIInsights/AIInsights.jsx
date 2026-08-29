function AIInsights({ data }) {
  const totalSales = Number(data?.total_sales || 0);
  const totalProfit = Number(data?.total_profit || 0);
  const totalOrders = Number(data?.total_orders || 0);
  const totalCustomers = Number(data?.total_customers || 0);

  const profitMargin =
    totalSales > 0
      ? (totalProfit / totalSales) * 100
      : 0;

  const categories = data?.sales_by_category || [];

  const topCategory =
    categories.length > 0
      ? categories.reduce((max, current) =>
          Number(current.sales || 0) > Number(max.sales || 0)
            ? current
            : max
        )
      : null;

  const averageOrderValue =
    totalOrders > 0
      ? totalSales / totalOrders
      : 0;

  const customerValue =
    totalCustomers > 0
      ? totalSales / totalCustomers
      : 0;

  const lowestCategory =
    categories.length > 0
      ? categories.reduce((min, current) =>
          Number(current.sales || 0) < Number(min.sales || 0)
            ? current
            : min
        )
      : null;

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl text-white shadow-md">
            🤖
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              AI Business Insights
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Automated analysis of your business data
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">

          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-emerald-700">
            Live analysis
          </span>

        </div>

      </div>

      {/* AI status */}
      <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">

        <div className="flex items-start gap-3">

          <span className="text-lg">
            ✨
          </span>

          <div>
            <p className="text-sm font-semibold text-indigo-800">
              Business intelligence summary
            </p>

            <p className="mt-1 text-sm leading-6 text-indigo-700">
              Your dashboard is analyzing sales, profitability,
              customers, and category performance to identify
              important business signals.
            </p>
          </div>

        </div>

      </div>

      {/* Insight cards */}
      <div className="mt-5 space-y-4">

        {/* Sales */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
              📊
            </div>

            <div className="min-w-0">

              <h3 className="font-semibold text-slate-800">
                Sales Performance
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                The business generated{" "}
                <span className="font-semibold text-slate-800">
                  {formatCurrency(totalSales)}
                </span>{" "}
                across{" "}
                <span className="font-semibold text-slate-800">
                  {totalOrders.toLocaleString("en-IN")}
                </span>{" "}
                orders.
              </p>

            </div>

          </div>

        </div>

        {/* Profit */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
              💰
            </div>

            <div className="min-w-0">

              <h3 className="font-semibold text-slate-800">
                Profitability
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Total profit is{" "}
                <span className="font-semibold text-slate-800">
                  {formatCurrency(totalProfit)}
                </span>{" "}
                with an estimated margin of{" "}
                <span className="font-semibold text-emerald-600">
                  {profitMargin.toFixed(1)}%
                </span>.
              </p>

            </div>

          </div>

        </div>

        {/* Top category */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100">
              🏆
            </div>

            <div className="min-w-0">

              <h3 className="font-semibold text-slate-800">
                Leading Category
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">

                <span className="font-semibold text-slate-800">
                  {topCategory?.category || "N/A"}
                </span>{" "}
                is currently the strongest sales category with{" "}
                <span className="font-semibold text-amber-600">
                  {formatCurrency(topCategory?.sales || 0)}
                </span>{" "}
                in sales.

              </p>

            </div>

          </div>

        </div>

        {/* Customer insight */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100">
              👥
            </div>

            <div className="min-w-0">

              <h3 className="font-semibold text-slate-800">
                Customer Intelligence
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">

                The dataset contains{" "}
                <span className="font-semibold text-slate-800">
                  {totalCustomers.toLocaleString("en-IN")}
                </span>{" "}
                customers. Average revenue per customer is approximately{" "}
                <span className="font-semibold text-purple-600">
                  {formatCurrency(customerValue)}
                </span>.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Business metrics */}
      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-slate-50 p-4">

          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Avg. order value
          </p>

          <p className="mt-1 text-lg font-bold text-slate-800">
            {formatCurrency(averageOrderValue)}
          </p>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Lowest category
          </p>

          <p className="mt-1 truncate text-lg font-bold text-slate-800">
            {lowestCategory?.category || "N/A"}
          </p>

        </div>

      </div>

      {/* Recommendation */}
      <div className="mt-5 rounded-xl border border-violet-100 bg-violet-50 p-4">

        <div className="flex gap-3">

          <span className="text-lg">
            💡
          </span>

          <div>

            <h3 className="font-semibold text-violet-800">
              Recommended Action
            </h3>

            <p className="mt-1 text-sm leading-6 text-violet-700">

              Focus on scaling the{" "}
              <span className="font-semibold">
                {topCategory?.category || "top-performing"}
              </span>{" "}
              category while investigating opportunities to improve
              performance in{" "}
              <span className="font-semibold">
                {lowestCategory?.category || "lower-performing categories"}
              </span>
              .

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIInsights;