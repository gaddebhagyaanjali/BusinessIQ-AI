import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Topbar from "../components/Dashboard/Topbar/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div className="ml-64 min-h-screen">

        <Topbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;