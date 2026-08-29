function ServiceCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300">

      <div className="text-5xl mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-gray-600 mt-4">
        {description}
      </p>

      <button className="mt-6 text-blue-600 font-semibold hover:text-blue-800">
        Learn More →
      </button>

    </div>
  );
}

export default ServiceCard;