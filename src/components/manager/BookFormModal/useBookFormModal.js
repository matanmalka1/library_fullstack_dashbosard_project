import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { CATEGORIES } from "../../../Utils/constants";

const getDefaults = (book) => ({
  title: book?.title || "",
  author: book?.author || "",
  isbn: book?.isbn || "",
  price: book?.price || 0,
  stock: book?.stockQuantity || 0,
  category: book?.categories?.[0] || CATEGORIES[0],
  coverImage: book?.coverImage || "",
});

export const useBookFormModal = (editingBook, { onClose, onSaved }) => {
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
    defaultValues: getDefaults(editingBook),
  });

  const coverImage = watch("coverImage");

  useEffect(() => {
    reset(getDefaults(editingBook));
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
        ...editingBook,
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

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    coverImage,
    isUploading,
    fileInputRef,
    handleFileChange,
    onSubmit,
  };
};
