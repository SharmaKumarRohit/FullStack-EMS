import { useNavigate } from "react-router-dom";
import { type Employee, DEPARTMENTS } from "../assets/assets";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

type PropsType = {
  initialData?: Employee;
  onSuccess: () => void;
  onCancel: () => void;
};

function EmployeeForm({ initialData, onSuccess, onCancel }: PropsType) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl animate-fade-in"
    >
      {/* Personal Information */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label htmlFor="firstName" className="block mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              defaultValue={initialData?.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              defaultValue={initialData?.lastName}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              required
              defaultValue={initialData?.phone}
            />
          </div>
          <div>
            <label htmlFor="joinDate" className="block mb-2">
              Join Date
            </label>
            <input
              type="date"
              name="joinDate"
              id="joinDate"
              required
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="bio" className="block mb-2">
              Bio (Optional)
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={3}
              defaultValue={initialData?.bio}
              className="resize-none"
              placeholder="Brief description..."
            ></textarea>
          </div>
        </div>
      </div>
      {/* Employment Details */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Employment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label htmlFor="department" className="block mb-2">
              Department
            </label>
            <select
              name="department"
              id="department"
              defaultValue={initialData?.department || ""}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="position" className="block mb-2">
              Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              required
              defaultValue={initialData?.position}
            />
          </div>
          <div>
            <label htmlFor="basicSalary" className="block mb-2">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              id="basicSalary"
              required
              min={0}
              step={0.01}
              defaultValue={initialData?.basicSalary || 0}
            />
          </div>
          <div>
            <label htmlFor="allowances" className="block mb-2">
              Allowances
            </label>
            <input
              type="number"
              name="allowances"
              id="allowances"
              required
              min={0}
              step={0.01}
              defaultValue={initialData?.allowances || 0}
            />
          </div>
          <div>
            <label htmlFor="deductions" className="block mb-2">
              Deductions
            </label>
            <input
              type="number"
              name="deductions"
              id="deductions"
              required
              min={0}
              step={0.01}
              defaultValue={initialData?.deductions || 0}
            />
          </div>
          {isEditMode && (
            <div>
              <label htmlFor="status" className="block mb-2">
                Status
              </label>
              <select
                name="status"
                id="status"
                defaultValue={initialData.employmentStatus}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Account Setup */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Account Setup
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block mb-2">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              defaultValue={initialData?.email}
            />
          </div>
          {!isEditMode && (
            <div>
              <label htmlFor="password" className="block mb-2">
                Temporary Password
              </label>
              <input type="password" name="password" id="password" required />
            </div>
          )}
          {isEditMode && (
            <div>
              <label htmlFor="change-password" className="block mb-2">
                Change Password (Optional)
              </label>
              <input
                type="password"
                name="change-password"
                id="change-password"
                required
                placeholder="Leave blank to keep current"
              />
            </div>
          )}
          <div>
            <label htmlFor="role" className="block mb-2">
              System Role
            </label>
            <select
              name="role"
              id="role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center justify-center"
          disabled={loading}
        >
          {loading && <Loader2Icon className="size-4 mr-2 animate-spin" />}{" "}
          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
