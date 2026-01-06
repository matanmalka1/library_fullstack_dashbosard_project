import React from "react";
import { X } from "lucide-react";

export const BookFormHeader = ({ editingBook, onClose }) => (
  <div className="px-8 py-8 border-b border-slate-200 flex items-center justify-between">
    <h3 className="font-serif text-2xl font-bold m-0">
      {editingBook ? "Edit" : "Add"} Book
    </h3>
    <button onClick={onClose} className="border-0 bg-transparent text-slate-300 cursor-pointer p-2 transition-colors hover:text-slate-500" type="button">
      <X className="w-5 h-5" />
    </button>
  </div>
);
