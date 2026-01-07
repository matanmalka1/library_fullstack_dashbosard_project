import { httpClient } from "./shared/httpClient";
import { BaseService } from "./BaseService";

class CategoryServiceClass extends BaseService {
  getCategories() {
    return this.handleRequest(async () => {
      const { data } = await httpClient.get("/books/categories");
      return data?.data?.categories || [];
    }, "Unable to load categories.");
  }
}

export const categoryService = new CategoryServiceClass();
