import { useEffect, useState } from "react";
import { type ProfileData } from "../assets/assets";
import Loading from "../components/Loading";
import { Lock } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useAuth } from "../context/AuthProvider";
import api from "../api/axios";
import axios from "axios";
import toast from "react-hot-toast";

function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      const profile = res.data;
      if (profile) setProfile(profile);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error?.response?.data?.error ||
          error.message ||
          "Failed to load profile data";
        toast.error(message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>
      {profile && (
        <ProfileForm initialData={profile} onSuccess={fetchProfile} />
      )}

      {/* Change password trigger */}
      <div className="card max-w-md p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 rounded-lg">
            <Lock className="size-5 text-slate-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Password</p>
            <p className="text-sm text-slate-500">
              Update your account password
            </p>
          </div>
        </div>
        <button
          className="btn-secondary text-sm"
          onClick={() => setShowPasswordModal(true)}
        >
          Change
        </button>
      </div>
      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}

export default Settings;
