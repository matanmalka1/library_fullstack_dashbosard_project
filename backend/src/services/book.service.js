import { Book, Review } from "../models/index.js";
import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";

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
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(200, Math.max(1, parseInt(query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const filter = buildSearchFilter(query);

  const [books, count] = await Promise.all([
    Book.find(filter)
      .populate(populateReviews())
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Book.countDocuments(filter),
  ]);

  return {
    books,
    count,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
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

export const createBook = async (data) => {
  const book = await Book.create(data);
  return book;
};

export const updateBook = async (id, data) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "Book not found",
      404
    );
  }

  Object.assign(book, data);
  await book.save();

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
