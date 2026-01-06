import React from "react";
import { X } from "lucide-react";
import "./BookFormHeader.css";

export const BookFormHeader = ({ editingBook, onClose }) => (
  <div className="book-form-modal__header">
    <h3 className="book-form-modal__title">
      {editingBook ? "Edit" : "Add"} Book
    </h3>
    <button onClick={onClose} className="book-form-modal__close" type="button">
      <X />
    </button>
  </div>
);
