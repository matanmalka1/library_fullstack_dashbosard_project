import { BaseService } from "./BaseService";

class CategoryServiceClass extends BaseService {
  constructor() {
    super();
  }

  getCategories() {
    return this.handleGetList("/books/categories", {
      dataKey: "categories",
      fallback: "Unable to load categories."
    });
  }
}

export const categoryService = new CategoryServiceClass();