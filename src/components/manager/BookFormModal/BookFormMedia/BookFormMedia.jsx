import React from "react";
import { Upload, Loader2 } from "lucide-react";

export const BookFormMedia = ({
  coverImage,
  errors,
  isUploading,
  fileInputRef,
  handleFileChange,
  register,
}) => (
  <div className="w-full flex flex-col gap-2 md:w-1/3">
    <div
      className={`aspect-[3/4] rounded-[20px] border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer ${
        errors.coverImage
          ? "border-red-500 bg-red-50"
          : "border-slate-200 bg-slate-50"
      }`}
      onClick={() => fileInputRef.current?.click()}
    >
      {isUploading ? (
        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
      ) : coverImage ? (
        <img
          src={coverImage}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <Upload className="w-6 h-6 text-slate-300" />
      )}
    </div>
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      className="hidden"
      accept="image/*"
    />
    <input
      type="hidden"
      {...register("coverImage", {
        validate: (value) => (value ? true : "Cover image is required."),
      })}
    />
    {errors.coverImage ? (
      <div className="text-red-500 text-xs">{errors.coverImage.message}</div>
    ) : null}
  </div>
);
