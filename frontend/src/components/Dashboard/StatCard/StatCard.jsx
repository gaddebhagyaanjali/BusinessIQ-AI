function StatCard({
  title,
  value,
  color = "text-slate-800",
  icon,
  percentage = "Live",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Decorative background */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-150" />

      {/* Header */}
      <div className="relative flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2
            className={`mt-3 text-3xl font-bold tracking-tight ${color}`}
          >
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

      </div>

      {/* Footer */}
      <div className="relative mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">

        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-sm text-emerald-600">
          ↗
        </span>

        <span className="text-sm font-semibold text-emerald-600">
          {percentage}
        </span>

        <span className="text-xs text-slate-400">
          updated from business data
        </span>

      </div>

    </div>
  );
}

export default StatCard;