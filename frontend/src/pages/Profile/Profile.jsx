import { useAuth } from "../../context/auth/AuthContext";
import { PersonalInfoForm } from "../../components/profile/PersonalInfoForm";
import { PasswordChangeForm } from "../../components/profile/PasswordChangeForm";
import { AlertBanner } from "../../components/ui/AlertBanner";
import { useState } from "react";

export const Profile = () => {
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl text-slate-900 mb-2">My Account</h1>
        <p className="text-slate-500">
          Manage your profile and account settings.
        </p>
      </div>

      {showSuccess && (
        <AlertBanner
          message={successMessage}
          className="mb-8 bg-green-50 border-green-200 text-green-800"
        />
      )}

      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        {/* Personal Info Section */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Personal Information
          </h2>
          <PersonalInfoForm user={user} onSuccess={handleSuccess} />
        </div>

        {/* Password Change Section */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Security</h2>
          <PasswordChangeForm user={user} onSuccess={handleSuccess} />
        </div>
      </div>

      {/* Account Info */}
      <div className="mt-12 bg-slate-50 border border-slate-200 rounded-[32px] p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">
          Account Details
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] font-bold text-slate-400 mb-1">
              Email
            </p>
            <p className="text-sm font-medium text-slate-800">
              {user?.email || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] font-bold text-slate-400 mb-1">
              Role
            </p>
            <p className="text-sm font-medium text-slate-800 capitalize">
              {user?.role || "User"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] font-bold text-slate-400 mb-1">
              Member Since
            </p>
            <p className="text-sm font-medium text-slate-800">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] font-bold text-slate-400 mb-1">
              Last Login
            </p>
            <p className="text-sm font-medium text-slate-800">
              {user?.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
