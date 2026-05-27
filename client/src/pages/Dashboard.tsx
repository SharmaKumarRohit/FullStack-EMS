import { useEffect, useState } from "react";
import {
  type EmployeeDashboardData,
  type AdminDashboardData,
} from "../assets/assets";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";
import api from "../api/axios";
import axios from "axios";
import toast from "react-hot-toast";

type DashboardData = AdminDashboardData | EmployeeDashboardData;

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.error ||
            error.message ||
            "Failed to load dashboard data";
          toast.error(message);
        } else {
          toast.error("Something Went Wrong");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (!data)
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load dashboard
      </p>
    );
  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
}

export default Dashboard;
