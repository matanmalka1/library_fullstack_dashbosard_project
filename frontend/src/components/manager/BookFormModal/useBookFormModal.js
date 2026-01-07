import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { bookService } from "../../../services/BookService";

const getDefaults = (book, categories) => ({
  title: book?.title || "",
  author: book?.author || "",
  isbn: book?.isbn || "",
  price: book?.price || 0,
  stock: book?.stockQuantity || 0,
  category: book?.categories?.[0] || categories?.[0] || "",
  coverImage: book?.coverImage || "",
});

export const useBookFormModal = (
  editingBook,
  categories,
  { onClose, onSaved }
) => {
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState("");
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
    defaultValues: getDefaults(editingBook, categories),
  });

  const coverImage = watch("coverImage");

  useEffect(() => {
    reset(getDefaults(editingBook, categories));
  }, [editingBook, categories, reset]);

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
    setFormError("");
    try {
      await bookService.saveBook({
        ...editingBook,
        ...data,
        price: Number(data.price),
        stockQuantity: Number(data.stock),
        categories: [data.category],
      });
      onSaved();
      onClose();
    } catch (error) {
      setFormError(error.message || "Failed to save book.");
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
    formError,
  };
};
