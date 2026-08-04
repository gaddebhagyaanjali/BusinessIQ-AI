function StatCard({ number, title }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

      <h2 className="text-5xl font-bold text-blue-600">
        {number}
      </h2>

      <p className="mt-4 text-gray-600 text-lg">
        {title}
      </p>

    </div>
  );
}

export default StatCard;