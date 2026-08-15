function RecentActivity({ data }) {
  const totalSales = Number(data?.total_sales || 0);
  const totalOrders = Number(data?.total_orders || 0);
  const totalCustomers = Number(data?.total_customers || 0);
  const totalProfit = Number(data?.total_profit || 0);

  const activities = [
    {
      icon: "📊",
      text: `Dashboard analyzed ${totalOrders.toLocaleString("en-IN")} transactions`,
    },
    {
      icon: "💰",
      text: `Total sales reached ₹${totalSales.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      icon: "👥",
      text: `${totalCustomers.toLocaleString("en-IN")} unique customer records identified`,
    },
    {
      icon: "📈",
      text: `Total profit calculated as ₹${totalProfit.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      icon: "🤖",
      text: "AI business insights generated successfully",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            📋 Recent Activity
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Latest dashboard activity
          </p>
        </div>

        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
          Live
        </span>

      </div>

      {/* Activities */}
      <div className="space-y-4">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b pb-4 last:border-b-0"
          >

            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg">
              {activity.icon}
            </div>

            {/* Activity */}
            <div>
              <p className="text-gray-700 font-medium">
                {activity.text}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Live dashboard data
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentActivity;