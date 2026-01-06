import React from "react";
import { CATEGORIES } from "../../../Utils/constants";
import { BookFormHeader } from "./BookFormHeader";
import { BookFormMedia } from "./BookFormMedia";
import { BookFormFields } from "./BookFormFields";
import { useBookFormModal } from "./useBookFormModal";
import { AlertBanner } from "../../ui/AlertBanner";

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
    formError,
  } = useBookFormModal(editingBook, { onClose, onSaved });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-lg z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-[720px] overflow-hidden shadow-[0_30px_60px_rgba(15,23,42,0.25)] animate-[modal-in_0.2s_ease]">
        <BookFormHeader editingBook={editingBook} onClose={onClose} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 grid gap-6"
        >
          <AlertBanner message={formError} />
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
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
            className="border-0 rounded-[16px] px-4 py-4 bg-indigo-600 text-white font-bold cursor-pointer shadow-[0_18px_30px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};
