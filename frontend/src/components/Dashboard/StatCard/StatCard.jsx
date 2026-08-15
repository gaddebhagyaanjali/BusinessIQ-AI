function StatCard({
  title,
  value,
  color,
  icon,
  percentage = "+12%",
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      {/* Top Section */}
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className={`text-4xl font-bold mt-3 ${color}`}>
            {value}
          </h2>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">

          {icon}

        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex items-center gap-2 mt-6">

        <span className="text-green-600 text-xl">
          📈
        </span>

        <span className="text-green-600 font-semibold">
          {percentage}
        </span>

        <span className="text-gray-500 text-sm">
          from last month
        </span>

      </div>

    </div>
  );
}

export default StatCard;