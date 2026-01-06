import React from "react";
import { Upload, Loader2 } from "lucide-react";
import "./BookFormMedia.css";

export const BookFormMedia = ({
  coverImage,
  errors,
  isUploading,
  fileInputRef,
  handleFileChange,
  register,
}) => (
  <div className="book-form-modal__media">
    <div
      className={`book-form-modal__dropzone ${errors.coverImage ? "error" : ""}`}
      onClick={() => fileInputRef.current?.click()}
    >
      {isUploading ? (
        <Loader2 className="book-form-modal__spinner" />
      ) : coverImage ? (
        <img
          src={coverImage}
          alt="Preview"
          className="book-form-modal__preview"
        />
      ) : (
        <Upload className="book-form-modal__upload-icon" />
      )}
    </div>
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      className="book-form-modal__file"
      accept="image/*"
    />
    <input
      type="hidden"
      {...register("coverImage", {
        validate: (value) => (value ? true : "Cover image is required."),
      })}
    />
    {errors.coverImage ? (
      <div className="book-form-modal__error">
        {errors.coverImage.message}
      </div>
    ) : null}
  </div>
);
