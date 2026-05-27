import { useCallback, useEffect, useState } from "react";
import {
  dummyEmployeeData,
  type Payslip,
  type Employee,
} from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";
import { useAuth } from "../context/AuthProvider";
import api from "../api/axios";
import axios from "axios";
import toast from "react-hot-toast";

function Payslips() {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const fetchPayslips = useCallback(async () => {
    try {
      const res = await api.get("/payslips");
      setPayslips(res.data.data || []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch payslips data";
        toast.error(message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin)
      api
        .get("/employees")
        .then((res) =>
          setEmployees(res.data.filter((e: Employee) => !e.isDeleted)),
        )
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            const message =
              error.response?.data?.error ||
              error.message ||
              "Failed to load employee data";
            toast.error(message);
          } else {
            toast.error("Something Went Wrong");
          }
        });
  }, [isAdmin]);

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslips history"}
          </p>
        </div>
        {isAdmin && (
          <GeneratePayslipForm
            employees={employees}
            onSuccess={fetchPayslips}
          />
        )}
      </div>
      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
}

export default Payslips;
