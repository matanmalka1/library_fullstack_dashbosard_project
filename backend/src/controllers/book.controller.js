import * as bookService from "../services/book.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";
import { getUserFromToken } from "../utils/auth-helpers.js";

// CREATE
// Create a new book entry.
export const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook(req.body);
  successResponse(res, { book }, "Book created successfully", 201);
});

// READ ALL
// List books with pagination and filters.
export const getAllBooks = asyncHandler(async (req, res) => {
  let includePendingReviews = false;
  if (req.query.includePendingReviews === "true") {
    const user = await getUserFromToken(req.headers.authorization);
    includePendingReviews = user?.role?.name === "admin";
  }

  const result = await bookService.getAllBooks(req.query, {
    includePendingReviews,
  });
  successResponse(res, result, "Books retrieved successfully");
});

// READ ONE
// Fetch a single book by id.
export const getBookById = asyncHandler(async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  successResponse(res, { book }, "Book retrieved successfully");
});

// READ CATEGORIES
// List distinct book categories.
export const getCategories = asyncHandler(async (_req, res) => {
  const categories = await bookService.getCategories();
  successResponse(res, { categories }, "Categories retrieved successfully");
});

// UPDATE
// Update an existing book entry.
export const updateBook = asyncHandler(async (req, res) => {
  const book = await bookService.updateBook(req.params.id, req.body);
  successResponse(res, { book }, "Book updated successfully");
});

// DELETE
// Delete a book and its reviews.
export const deleteBook = asyncHandler(async (req, res) => {
  await bookService.deleteBook(req.params.id);
  successResponse(res, null, "Book deleted successfully");
});
