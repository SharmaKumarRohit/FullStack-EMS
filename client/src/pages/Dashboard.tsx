import { useEffect, useState } from "react";
import {
  dummyEmployeeDashboardData,
  dummyAdminDashboardData,
  type EmployeeDashboardData,
  type AdminDashboardData,
} from "../assets/assets";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";

type DashboardData = AdminDashboardData | EmployeeDashboardData;
function isAdmin(data: DashboardData): data is AdminDashboardData {
  return "role" in data;
}

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyEmployeeDashboardData);
    const timeOutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, []);

  if (loading) return <Loading />;
  if (!data)
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load dashboard
      </p>
    );
  if (isAdmin(data)) {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
}

export default Dashboard;
