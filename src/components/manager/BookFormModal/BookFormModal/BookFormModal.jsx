import React from "react";
import { CATEGORIES } from "../../../../Utils/constants";
import { BookFormHeader } from "../BookFormHeader/BookFormHeader";
import { BookFormMedia } from "../BookFormMedia/BookFormMedia";
import { BookFormFields } from "../BookFormFields/BookFormFields";
import { useBookFormModal } from "../useBookFormModal";
import "./BookFormModal.css";

export const BookFormModal = ({ editingBook, onClose, onSaved }) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    coverImage,
    isUploading,
    fileInputRef,
    handleFileChange,
    onSubmit,
  } = useBookFormModal(editingBook, { onClose, onSaved });

  return (
    <div className="book-form-modal">
      <div className="book-form-modal__card">
        <BookFormHeader editingBook={editingBook} onClose={onClose} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="book-form-modal__form"
        >
          <div className="book-form-modal__body">
            <BookFormMedia
              coverImage={coverImage}
              errors={errors}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              register={register}
            />
            <BookFormFields
              register={register}
              errors={errors}
              categories={CATEGORIES}
            />
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
