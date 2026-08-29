import StatCard from "../StatCard/StatCard";

function OverviewCards({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {/* Total Sales */}
      <StatCard
        title="Total Sales"
        vvalue={`₹${Number(data.total_sales || 0).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}`}
        color="text-green-600"
        icon="💰"
        percentage="Live"
      />

      {/* Total Orders */}
      <StatCard
        title="Total Orders"
        value={Number(data.total_orders || 0).toLocaleString()}
        color="text-blue-600"
        icon="🛒"
        percentage="Live"
      />

      {/* Total Customers */}
      <StatCard
        title="Total Customers"
        value={Number(data.total_customers || 0).toLocaleString()}
        color="text-purple-600"
        icon="👥"
        percentage="Live"
      />

      {/* Total Profit */}
      <StatCard
        title="Total Profit"
        value={`₹${Number(data.total_profit || 0).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}`}
        color="text-orange-500"
        icon="📈"
        percentage="Live"
      />

    </div>
  );
}

export default OverviewCards;