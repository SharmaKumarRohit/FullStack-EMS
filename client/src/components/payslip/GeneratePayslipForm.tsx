import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import type { Employee } from "../../assets/assets";
import Modal from "../Modal";
import api from "../../api/axios";
import axios from "axios";
import toast from "react-hot-toast";

type PropsType = {
  employees: Employee[];
  onSuccess: () => void;
};

function GeneratePayslipForm({ employees, onSuccess }: PropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="size-4" /> Generate Payslip
      </button>
    );

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await api.post("/payslips", data);
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "Failed to generate payslip";
        toast.error(message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsOpen(false);
  return (
    <Modal closeModal={closeModal} maxWidth="max-w-lg" alignment="items-center">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Generate Monthly Payslip
          </h3>
          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* select employee */}
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Employee
            </label>
            <select name="employeeId" id="employeeId" required>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div>

          {/* select month & year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="month"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Month
              </label>
              <select name="month" id="month">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Year
              </label>
              <input
                type="number"
                name="year"
                id="year"
                defaultValue={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          {/* Basic salary */}
          <div>
            <label
              htmlFor="basicSalary"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              id="basicSalary"
              defaultValue={5000}
              required
            />
          </div>

          {/* Allowances & Deductions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="allowances"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Allowances
              </label>
              <input
                type="number"
                name="allowances"
                id="allowances"
                defaultValue={0}
                required
              />
            </div>
            <div>
              <label
                htmlFor="deductions"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                id="deductions"
                defaultValue={0}
                required
              />
            </div>
          </div>

          {/* buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
              Generate
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default GeneratePayslipForm;
