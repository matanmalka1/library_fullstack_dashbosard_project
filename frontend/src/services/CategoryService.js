import { httpClient } from "./shared/httpClient";
import { BaseService } from "./BaseService";

class CategoryServiceClass extends BaseService {
  constructor() {
    super();
    this.httpClient = httpClient;
  }

  getCategories() {
    return this.handleGetList("/books/categories", {
      dataKey: "categories",
      fallback: "Unable to load categories."
    });
  }
}

export const categoryService = new CategoryServiceClass();