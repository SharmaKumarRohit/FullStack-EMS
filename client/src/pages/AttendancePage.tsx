import { useCallback, useEffect, useState } from "react";
import { type Attendance } from "../assets/assets";
import Loading from "../components/Loading";
import CheckInButton from "../components/attendance/CheckInButton";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceHistory from "../components/attendance/AttendanceHistory";
import api from "../api/axios";
import axios from "axios";
import toast from "react-hot-toast";

function AttendancePage() {
  const [history, setHistory] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/attendance");
      const json = res.data;
      setHistory(json.data || []);
      if (json.employee?.isDeleted) setIsDeleted(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "Failed to load attendance data";
        toast.error(message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  // This code finds today's entry from a list by comparing only the date (not time).
  const today = new Date();
  // Reset time to midnight - So we only compare dates, not time.
  today.setHours(0, 0, 0, 0);
  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">
          Track your work hours and daily check-ins
        </p>
      </div>
      {isDeleted ? (
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-rose-600">
            You can no longer clock in or out because your employee records have
            been marked as deleted.
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}
      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />
    </div>
  );
}

export default AttendancePage;
