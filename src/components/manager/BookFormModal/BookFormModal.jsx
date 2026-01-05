import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Loader2 } from "lucide-react";
import { api } from "../../../services/api";
import { CATEGORIES } from "../../../Utils/constants";
import "./BookFormModal.css";

export const BookFormModal = ({ editingBook, onClose, onSaved }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: editingBook?.title || "",
      author: editingBook?.author || "",
      isbn: editingBook?.isbn || "",
      price: editingBook?.price || 0,
      stock: editingBook?.stockQuantity || 0,
      category: editingBook?.categories?.[0] || CATEGORIES[0],
      coverImage: editingBook?.coverImage || "",
    },
  });


  const coverImage = watch("coverImage");

  useEffect(() => {
    reset({
      title: editingBook?.title || "",
      author: editingBook?.author || "",
      isbn: editingBook?.isbn || "",
      price: editingBook?.price || 0,
      stock: editingBook?.stockQuantity || 0,
      category: editingBook?.categories?.[0] || CATEGORIES[0],
      coverImage: editingBook?.coverImage || "",
    });
  }, [editingBook, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setIsUploading(true);
      clearErrors("coverImage");
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("coverImage", reader.result);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setIsUploading(false);
      };
      reader.onabort = () => {
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      setError("coverImage", {
        type: "validate",
        message: "Image must be under 2MB.",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await api.saveBook({
        ...editingBook, // Keep ID for updates
        ...data,
        price: Number(data.price),
        stockQuantity: Number(data.stock),
        categories: [data.category],
      });
      onSaved();
      onClose();
    } catch (error) {
      console.error("Failed to save book:", error);
    }
  };

  return (
    <div className="book-form-modal">
      <div className="book-form-modal__card">
        <div className="book-form-modal__header">
          <h3 className="book-form-modal__title">
            {editingBook ? "Edit" : "Add"} Book
          </h3>
          <button
            onClick={onClose}
            className="book-form-modal__close"
            type="button"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="book-form-modal__form"
        >
          <div className="book-form-modal__body">
            {/* Image Upload Section */}
            <div className="book-form-modal__media">
              <div
                className={`book-form-modal__dropzone ${
                  errors.coverImage ? "error" : ""
                }`}
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
                  validate: (value) =>
                    value ? true : "Cover image is required.",
                })}
              />
              {errors.coverImage ? (
                <div className="book-form-modal__error">
                  {errors.coverImage.message}
                </div>
              ) : null}
            </div>

            <div className="book-form-modal__fields">
              <input
                {...register("title", { required: true })}
                className={`book-form-modal__input book-form-modal__input--wide ${
                  errors.title ? "is-invalid" : ""
                }`}
                placeholder="Title"
              />

              <input
                {...register("author", { required: true })}
                className="book-form-modal__input"
                placeholder="Author"
              />

              <input
                {...register("isbn", { required: true })}
                className="book-form-modal__input"
                placeholder="ISBN"
              />

              <input
                type="number"
                {...register("price", { min: 0 })}
                className="book-form-modal__input"
                placeholder="Price"
              />

              <input
                type="number"
                {...register("stock", { min: 0 })}
                className="book-form-modal__input"
                placeholder="Stock"
              />

              <select
                {...register("category")}
                className="book-form-modal__input book-form-modal__input--wide book-form-modal__select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="book-form-modal__submit"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};
