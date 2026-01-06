import React from "react";

export const BookFormFields = ({ register, errors, categories }) => (
  <div className="flex-1 grid grid-cols-2 gap-4">
    <input
      {...register("title", { required: true })}
      className={`col-span-2 px-4 py-3 bg-slate-50 rounded-2xl border ${
        errors.title ? "border-red-400" : "border-transparent"
      } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
      placeholder="Title"
    />

    <input
      {...register("author", { required: true })}
      className="px-4 py-3 bg-slate-50 rounded-2xl border border-transparent text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
      placeholder="Author"
    />

    <input
      {...register("isbn", { required: true })}
      className="px-4 py-3 bg-slate-50 rounded-2xl border border-transparent text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
      placeholder="ISBN"
    />

    <input
      type="number"
      {...register("price", { min: 0 })}
      className="px-4 py-3 bg-slate-50 rounded-2xl border border-transparent text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
      placeholder="Price"
    />

    <input
      type="number"
      {...register("stock", { min: 0 })}
      className="px-4 py-3 bg-slate-50 rounded-2xl border border-transparent text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
      placeholder="Stock"
    />

    <select
      {...register("category")}
      className="col-span-2 px-4 py-3 bg-slate-50 rounded-2xl border border-transparent text-sm outline-none cursor-pointer focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);
