import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import OverviewCards from "../../components/Dashboard/OverviewCards/OverviewCards";
import SalesChart from "../../components/Dashboard/SalesChart/SalesChart";
import CustomerChart from "../../components/Dashboard/CustomerChart/CustomerChart";
import AIInsights from "../../components/Dashboard/AIInsights/AIInsights";
import RecentActivity from "../../components/Dashboard/RecentActivity/RecentActivity";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // CURRENT DATE
  // =====================================================

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/dashboard/overview`
);

        const data = await response.json();

        console.log("Dashboard API Response:", data);

        if (!response.ok) {
          throw new Error(
            data.detail ||
              data.message ||
              `Dashboard request failed with status ${response.status}`
          );
        }

        if (data.status === "error") {
          throw new Error(
            data.message || "Failed to load dashboard data."
          );
        }

        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard Error:", err);

        setError(
          err.message ||
            "Unable to connect to the dashboard backend."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col items-center justify-between lg:flex-row">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome to BusinessIQ AI Dashboard
          </p>
        </div>

        <div className="mt-6 rounded-xl bg-white px-6 py-4 shadow-md lg:mt-0">

          <p className="text-sm text-gray-500">
            Today's Date
          </p>

          <h2 className="text-xl font-bold text-slate-700">
            {today}
          </h2>

        </div>

      </div>


      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm">

          <p className="text-lg font-semibold text-slate-700">
            ⏳ Loading dashboard...
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Fetching business data from the backend.
          </p>

        </div>
      )}


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">

          <p className="font-semibold">
            ⚠️ Dashboard Error
          </p>

          <p className="mt-1">
            {error}
          </p>

          <p className="mt-3 text-sm">
            Make sure the FastAPI backend is running on port 8000.
          </p>

        </div>
      )}


      {/* =====================================================
          DASHBOARD DATA
      ===================================================== */}

      {!loading && !error && dashboardData && (
        <>

          {/* =================================================
              OVERVIEW CARDS
          ================================================= */}

          <div className="mt-10">

            <OverviewCards
              data={dashboardData}
            />

          </div>


          {/* =================================================
              CHARTS
          ================================================= */}

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

            <SalesChart
              data={dashboardData.sales_by_category || []}
            />

            <CustomerChart
              data={dashboardData.customer_segments || []}
            />

          </div>


          {/* =================================================
              AI INSIGHTS + RECENT ACTIVITY
          ================================================= */}

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

            <AIInsights
              data={dashboardData}
            />

            <RecentActivity data={dashboardData} />

          </div>

        </>
      )}

    </DashboardLayout>
  );
}

export default Dashboard;