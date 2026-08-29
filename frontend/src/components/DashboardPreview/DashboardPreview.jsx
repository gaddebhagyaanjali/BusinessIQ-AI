import {
  FaArrowTrendUp,
  FaShieldHalved,
  FaUsers,
  FaRobot,
} from "react-icons/fa6";

function DashboardPreview() {
  return (
    <div className="relative">

      {/* Main Dashboard */}
      <div className="w-[620px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Top Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-slate-50">

          <div>
            <h2 className="font-bold text-xl text-slate-800">
              Business Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Live Analytics
            </p>
          </div>

          <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">
            ● Online
          </div>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-4 gap-4 p-6">

          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Revenue
            </p>

            <h2 className="text-2xl font-bold mt-2">
              ₹1.25M
            </h2>
          </div>

          <div className="bg-green-50 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Sales
            </p>

            <h2 className="text-2xl font-bold mt-2">
              +25%
            </h2>
          </div>

          <div className="bg-red-50 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Fraud
            </p>

            <h2 className="text-2xl font-bold mt-2">
              99%
            </h2>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Customers
            </p>

            <h2 className="text-2xl font-bold mt-2">
              12K
            </h2>
          </div>

        </div>

        {/* Chart */}

        <div className="px-6">

          <h3 className="font-semibold mb-4 text-slate-700">
            Sales Performance
          </h3>

          <div className="h-60 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-end justify-evenly p-8">

            <div className="w-8 h-24 bg-blue-500 rounded-t-xl"></div>
            <div className="w-8 h-40 bg-blue-500 rounded-t-xl"></div>
            <div className="w-8 h-32 bg-blue-500 rounded-t-xl"></div>
            <div className="w-8 h-48 bg-blue-500 rounded-t-xl"></div>
            <div className="w-8 h-36 bg-blue-500 rounded-t-xl"></div>
            <div className="w-8 h-52 bg-blue-500 rounded-t-xl"></div>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="grid grid-cols-2 gap-5 p-6">

          <div className="bg-slate-50 rounded-2xl p-5">

            <h3 className="font-semibold mb-4">
              AI Insights
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>📈 Sales increased by 18%</li>

              <li>😊 Positive sentiment detected</li>

              <li>🛡 Fraud risk is very low</li>

            </ul>

          </div>

          <div className="bg-slate-50 rounded-2xl p-5">

            <h3 className="font-semibold mb-4">
              Recent Activity
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>✔ New prediction generated</li>

              <li>✔ Sales report downloaded</li>

              <li>✔ Customer data updated</li>

            </ul>

          </div>

        </div>

      </div>

      {/* Floating Cards */}

      <div className="absolute -left-8 top-16 bg-white rounded-2xl shadow-xl px-5 py-4 flex gap-3 items-center">

        <FaArrowTrendUp className="text-green-500 text-3xl"/>

        <div>

          <h3 className="font-bold">
            +24%
          </h3>

          <p className="text-sm text-gray-500">
            Growth
          </p>

        </div>

      </div>

      <div className="absolute -right-8 top-32 bg-white rounded-2xl shadow-xl px-5 py-4 flex gap-3 items-center">

        <FaShieldHalved className="text-red-500 text-3xl"/>

        <div>

          <h3 className="font-bold">
            Secure
          </h3>

          <p className="text-sm text-gray-500">
            AI Protected
          </p>

        </div>

      </div>

      <div className="absolute left-20 -bottom-8 bg-white rounded-2xl shadow-xl px-5 py-4 flex gap-3 items-center">

        <FaRobot className="text-blue-600 text-3xl"/>

        <div>

          <h3 className="font-bold">
            AI
          </h3>

          <p className="text-sm text-gray-500">
            Smart Insights
          </p>

        </div>

      </div>

      <div className="absolute right-10 -bottom-8 bg-white rounded-2xl shadow-xl px-5 py-4 flex gap-3 items-center">

        <FaUsers className="text-indigo-600 text-3xl"/>

        <div>

          <h3 className="font-bold">
            12K+
          </h3>

          <p className="text-sm text-gray-500">
            Customers
          </p>

        </div>

      </div>

    </div>
  );
}

export default DashboardPreview;