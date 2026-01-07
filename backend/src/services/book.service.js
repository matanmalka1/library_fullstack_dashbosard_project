import { Book, Review, Category } from "../models/index.js";
import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";
import { parsePaginationParams,buildPaginationMeta } from "../utils/pagination.js";

const buildSearchFilter = ({ search, category }) => {
  const filter = {};
  if (search) {
    const term = search.trim();
    if (term) {
      filter.$or = [
        { title: { $regex: term, $options: "i" } },
        { author: { $regex: term, $options: "i" } },
      ];
    }
  }
  if (category) {
    filter.categories = { $in: [category] };
  }
  return filter;
};

const populateReviews = () => ({
  path: "reviews",
  match: { approved: true },
  select: "user userName rating comment approved date createdAt",
  options: { sort: { createdAt: -1 } },
});

export const getAllBooks = async (query) => {
  const { page, limit, skip } = parsePaginationParams(query, {
    defaultLimit: 20,
    maxLimit: 200,
  });
  const includeReviews = query.includeReviews !== "false";

  const filter = buildSearchFilter(query);

  const booksQuery = Book.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (includeReviews) {
    booksQuery.populate(populateReviews());
  } else {
    booksQuery.select("-reviews");
  }

  const [books, count] = await Promise.all([
    booksQuery.lean(),
    Book.countDocuments(filter),
  ]);

  return {
    books,
    ...buildPaginationMeta(page, limit, count),
  };
};

export const getBookById = async (id) => {
  const book = await Book.findById(id).populate(populateReviews()).lean();
  if (!book) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "Book not found",
      404
    );
  }
  return book;
};

export const getCategories = async () => {
  const categories = await Category.find()
    .select("name -_id")
    .sort({ name: 1 })
    .lean();
  return categories.map((category) => category.name);
};

export const createBook = async (data) => {
  const book = await Book.create(data);
  return book;
};

export const updateBook = async (id, data) => {
  const book = await Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "Book not found",
      404
    );
  }

  return book;
};

export const deleteBook = async (id) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "Book not found",
      404
    );
  }

  await Review.deleteMany({ book: id });
  await book.deleteOne();
};
