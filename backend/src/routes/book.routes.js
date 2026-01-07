import express from "express";
import {
  getAllBooks,
  getBookById,
  getCategories,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import {
  validateBookIdParam,
  validateCreateBook,
  validateUpdateBook,
} from "../validators/bookValidate.js";

export const router = express.Router();

router.get("/", getAllBooks);
router.get("/categories", getCategories);
router.get("/:id", validateBookIdParam, getBookById);
router.post("/",authenticate,authorize("admin", "manager"),validateCreateBook,createBook);
router.put("/:id",authenticate,authorize("admin", "manager"),validateBookIdParam,validateUpdateBook,updateBook);
router.delete("/:id",authenticate,authorize("admin", "manager"),validateBookIdParam,deleteBook);
