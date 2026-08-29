function RevenueTable() {

  const reports = [
    {
      id: 1,
      product: "Laptop",
      revenue: "₹1,25,000",
      growth: "+15%",
    },
    {
      id: 2,
      product: "Mobile",
      revenue: "₹95,000",
      growth: "+10%",
    },
    {
      id: 3,
      product: "Headphones",
      revenue: "₹52,000",
      growth: "+8%",
    },
    {
      id: 4,
      product: "Smart Watch",
      revenue: "₹41,000",
      growth: "+12%",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          💰 Revenue Report
        </h2>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Export
        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="pb-3">Product</th>
            <th className="pb-3">Revenue</th>
            <th className="pb-3">Growth</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-slate-50 transition"
            >

              <td className="py-4">
                {item.product}
              </td>

              <td className="py-4 font-semibold">
                {item.revenue}
              </td>

              <td className="py-4 text-green-600 font-semibold">
                {item.growth}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RevenueTable;