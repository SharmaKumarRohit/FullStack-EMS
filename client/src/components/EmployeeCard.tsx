import { Loader2, PencilIcon, Trash2Icon, TriangleAlert } from "lucide-react";
import type { Employee } from "../assets/assets";
import api from "../api/axios";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import { useState } from "react";

type PropsType = {
  employee: Employee;
  onDelete: () => void;
  onEdit: (emp: Employee) => void;
};

function EmployeeCard({ employee, onDelete, onEdit }: PropsType) {
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const closeModal = () => setIsDelete(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/employees/${employee.id}`);
      onDelete();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "Failed to delete employees";
        toast.error(message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setLoading(false);
      closeModal();
    }
  };
  return (
    <>
      <div className="relative group card card-hover overflow-hidden">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-slate-100 to-slate-50">
          <div className="w-full h-full flex items-center justify-center">
            {/* circle icons */}
            <div className="size-20 rounded-full bg-linear-to-br from-indigo-100 to-slate-100 flex items-center justify-center">
              <span className="text-2xl font-medium text-indigo-400">
                {employee.firstName[0]} {employee.lastName[0]}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-600 rounded-lg shadow-sm">
            {employee.department || "Remote"}
          </span>
          {employee.isDeleted && (
            <span className="bg-red-500/60 font-medium text-white px-2.5 py-1 text-xs rounded">
              DELETED
            </span>
          )}
        </div>
        {!employee.isDeleted && (
          <div className="absolute inset-0 bg-linear-to-t from-indigo-700/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">
            <button
              onClick={() => onEdit(employee)}
              className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              <PencilIcon className="size-4" />
            </button>
            <button
              onClick={() => setIsDelete(true)}
              className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-600 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        )}
        <div className="p-5">
          <h3 className="text-slate-900">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-xs text-slate-500">{employee.position}</p>
        </div>
      </div>
      {isDelete && (
        <Modal
          closeModal={closeModal}
          maxWidth="max-w-md"
          alignment="items-center"
        >
          <div className="p-6 flex flex-col items-center gap-4">
            <div className="size-10 rounded-full flex items-center justify-center bg-rose-50 text-rose-600">
              <TriangleAlert className="size-5" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-700">
              Are you sure?
            </h3>
            <p className="text-center text-neutral-500">
              This action cannot be undone. All values associated with this
              employee will be permanently lost.
            </p>
            <div>
              <button className="btn-secondary mr-4" onClick={closeModal}>
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleDelete}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 px-5 py-2.5 rounded-md text-sm transition-all duration-200 active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default EmployeeCard;
