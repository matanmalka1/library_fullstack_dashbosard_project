import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/auth/AuthContext";
import { profilePictureSchema } from "../../validators/profile/profile-picture-schema";

export const ProfilePictureForm = ({ user, onSuccess }) => {
  const { updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(user?.profilePicture || null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = profilePictureSchema.safeParse(file);
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setPreview(base64);
      setError("");

      // Auto-save on file select
      setIsSubmitting(true);
      try {
        const updatedUser = await authService.updateProfile({
          profilePicture: base64,
        });
        updateUser(updatedUser);
        onSuccess("Profile picture updated!");
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch (err) {
        setError(err.message || "Failed to upload picture");
        setPreview(user?.profilePicture || null);
      } finally {
        setIsSubmitting(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to read file");
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    setIsSubmitting(true);
    try {
      const updatedUser = await authService.updateProfile({
        profilePicture: null,
      });
      updateUser(updatedUser);
      setPreview(null);
      onSuccess("Profile picture removed!");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to remove picture");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 w-full">
          {error}
        </div>
      )}

      {/* Avatar Preview */}
      <div className="relative">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center border-4 border-indigo-200">
            <span className="text-4xl font-bold text-white">
              {user?.firstName?.[0]?.toUpperCase()}
              {user?.lastName?.[0]?.toUpperCase()}
            </span>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isSubmitting}
          className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700 disabled:bg-slate-300 cursor-pointer border-2 border-white"
          title="Upload picture"
          type="button"
        >
          <Upload className="w-4 h-4" />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isSubmitting}
      />

      {/* Actions */}
      {preview && (
        <button
          onClick={handleRemove}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:text-slate-300 border-0 bg-transparent cursor-pointer"
          type="button"
        >
          <X className="w-4 h-4" /> Remove Picture
        </button>
      )}

      {saved && <p className="text-sm text-emerald-600">Updated</p>}

      <p className="text-xs text-slate-500 text-center">
        JPG, PNG or GIF (max 2MB)
      </p>
    </div>
  );
};
