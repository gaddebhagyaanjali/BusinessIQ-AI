function AIInsights({ data }) {
  const totalSales = Number(data?.total_sales || 0);
  const totalProfit = Number(data?.total_profit || 0);
  const totalOrders = Number(data?.total_orders || 0);
  const totalCustomers = Number(data?.total_customers || 0);

  const profitMargin =
    totalSales > 0
      ? ((totalProfit / totalSales) * 100).toFixed(2)
      : "0.00";

  const categories = data?.sales_by_category || [];

  let topCategory = "N/A";
  let topCategorySales = 0;

  if (categories.length > 0) {
    const highestCategory = categories.reduce(
      (max, current) =>
        Number(current.sales) > Number(max.sales)
          ? current
          : max
    );

    topCategory = highestCategory.category;
    topCategorySales = Number(highestCategory.sales);
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            🤖 AI Insights
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Insights generated from business data
          </p>
        </div>

        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
          Live
        </span>

      </div>

      <div className="space-y-5">

        {/* Sales Insight */}
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-xl">

          <h3 className="font-semibold text-blue-700">
            📊 Sales Performance
          </h3>

          <p className="text-gray-600 mt-1">
            The business generated{" "}
            <span className="font-semibold text-slate-800">
              ₹
              {totalSales.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>{" "}
            in total sales from{" "}
            <span className="font-semibold text-slate-800">
              {totalOrders.toLocaleString("en-IN")}
            </span>{" "}
            transactions.
          </p>

        </div>

        {/* Profit Insight */}
        <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-xl">

          <h3 className="font-semibold text-green-700">
            💰 Profitability
          </h3>

          <p className="text-gray-600 mt-1">
            Total profit is{" "}
            <span className="font-semibold text-slate-800">
              ₹
              {totalProfit.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>{" "}
            with a profit margin of{" "}
            <span className="font-semibold text-green-700">
              {profitMargin}%
            </span>.
          </p>

        </div>

        {/* Top Category */}
        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-xl">

          <h3 className="font-semibold text-purple-700">
            🏆 Top Sales Category
          </h3>

          <p className="text-gray-600 mt-1">
            <span className="font-semibold text-slate-800">
              {topCategory}
            </span>{" "}
            generated the highest sales of{" "}
            <span className="font-semibold text-purple-700">
              ₹
              {topCategorySales.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>.
          </p>

        </div>

        {/* Customer Insight */}
        <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-xl">

          <h3 className="font-semibold text-orange-700">
            👥 Customer Overview
          </h3>

          <p className="text-gray-600 mt-1">
            The dataset contains{" "}
            <span className="font-semibold text-slate-800">
              {totalCustomers.toLocaleString("en-IN")}
            </span>{" "}
            unique customer records.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AIInsights;