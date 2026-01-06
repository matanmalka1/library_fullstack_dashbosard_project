import React from "react";
import "./BookFormFields.css";

export const BookFormFields = ({ register, errors, categories }) => (
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
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);
