export const BookFormFields = ({ register, errors, categories }) => (
  <div className="flex-1 grid grid-cols-2 gap-4">
    <div className="col-span-2">
      <input
        {...register("title", { required: "Title is required" })}
        className={`w-full px-4 py-3 bg-slate-50 rounded-2xl border ${
          errors.title ? "border-red-400" : "border-transparent"
        } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
        placeholder="Title"
      />
      {errors.title && (
        <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
      )}
    </div>

    <div>
      <input
        {...register("author", { required: "Author is required" })}
        className={`w-full px-4 py-3 bg-slate-50 rounded-2xl border ${
          errors.author ? "border-red-400" : "border-transparent"
        } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
        placeholder="Author"
      />
      {errors.author && (
        <p className="text-xs text-red-500 mt-1">{errors.author.message}</p>
      )}
    </div>

    <div>
      <input
        {...register("isbn", { required: "ISBN is required" })}
        className={`w-full px-4 py-3 bg-slate-50 rounded-2xl border ${
          errors.isbn ? "border-red-400" : "border-transparent"
        } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
        placeholder="ISBN"
      />
      {errors.isbn && (
        <p className="text-xs text-red-500 mt-1">{errors.isbn.message}</p>
      )}
    </div>

    <div>
      <input
        type="number"
        {...register("price", {
          required: "Price is required",
          min: { value: 1, message: "Price must be higher then $1" },
        })}
        className={`w-full px-4 py-3 bg-slate-50 rounded-2xl border ${
          errors.price ? "border-red-400" : "border-transparent"
        } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
        placeholder="Price"
      />
      {errors.price && (
        <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
      )}
    </div>

    <div>
      <input
        type="number"
        {...register("stock", {
          required: "Stock is required",
          min: { value: 0, message: "Stock must be 0 or higher" },
        })}
        className={`w-full px-4 py-3 bg-slate-50 rounded-2xl border ${
          errors.stock ? "border-red-400" : "border-transparent"
        } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
        placeholder="Stock"
      />
      {errors.stock && (
        <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>
      )}
    </div>

    <div className="col-span-2">
      <select
        {...register("category", { required: "Category is required" })}
        className={`w-full px-4 py-3 bg-slate-50 rounded-2xl border ${
          errors.category ? "border-red-400" : "border-transparent"
        } text-sm outline-none cursor-pointer focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
      >
        <option value="">Select a category</option>
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))
        ) : (
          <option disabled>No categories available</option>
        )}
      </select>
      {errors.category && (
        <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
      )}
    </div>
  </div>
);
