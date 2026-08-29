function TopProducts() {

  const products = [
    { name: "Laptop", sales: 95 },
    { name: "Mobile", sales: 85 },
    { name: "Tablet", sales: 75 },
    { name: "Watch", sales: 68 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        🔥 Top Products
      </h2>

      <div className="space-y-5">

        {products.map((item, index) => (

          <div key={index}>

            <div className="flex justify-between mb-2">

              <span>{item.name}</span>

              <span>{item.sales}%</span>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-3">

              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${item.sales}%` }}
              ></div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopProducts;