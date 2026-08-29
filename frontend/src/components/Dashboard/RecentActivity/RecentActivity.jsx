function RecentActivity({ data }) {
  const totalSales = Number(data?.total_sales || 0);
  const totalOrders = Number(data?.total_orders || 0);
  const totalCustomers = Number(data?.total_customers || 0);
  const totalProfit = Number(data?.total_profit || 0);

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;

  const activities = [
    {
      icon: "📊",
      title: "Transaction analysis completed",
      description: `${totalOrders.toLocaleString(
        "en-IN"
      )} transactions analyzed`,
      status: "Completed",
    },
    {
      icon: "💰",
      title: "Sales performance updated",
      description: `${formatCurrency(totalSales)} total sales recorded`,
      status: "Updated",
    },
    {
      icon: "👥",
      title: "Customer intelligence refreshed",
      description: `${totalCustomers.toLocaleString(
        "en-IN"
      )} customer records identified`,
      status: "Updated",
    },
    {
      icon: "📈",
      title: "Profit analysis completed",
      description: `${formatCurrency(totalProfit)} total profit calculated`,
      status: "Completed",
    },
    {
      icon: "🤖",
      title: "AI business analysis generated",
      description: "Business insights are ready for review",
      status: "AI Ready",
    },
  ];

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
            📋
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Recent Activity
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Latest business intelligence events
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">

          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-emerald-700">
            Live
          </span>

        </div>

      </div>

      {/* Activity timeline */}
      <div className="mt-6">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="relative flex gap-4 pb-6 last:pb-0"
          >

            {/* Timeline line */}
            {index !== activities.length - 1 && (
              <div className="absolute left-5 top-11 h-full w-px bg-slate-200" />
            )}

            {/* Icon */}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm">
              {activity.icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                <h3 className="font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                  {activity.status}
                </span>

              </div>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                {activity.description}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                BusinessIQ AI
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentActivity;