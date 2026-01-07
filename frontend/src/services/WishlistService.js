import { httpClient } from "./shared/httpClient";
import { normalizeIds } from "./shared/normalize";
import { BaseService } from "./BaseService";

class WishlistServiceClass extends BaseService {
  getWishlist() {
    return this.handleRequest(async () => {
      const { data } = await httpClient.get("/wishlist");
      return normalizeIds(data?.data?.items || []);
    }, "Unable to load wishlist.");
  }

  toggleWishlist(_userId, bookId) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.post("/wishlist/toggle", { bookId });
      return normalizeIds(data?.data?.items || []);
    }, "Unable to update wishlist.");
  }

  clearWishlist() {
    return this.handleRequest(async () => {
      await httpClient.delete("/wishlist");
      return true;
    }, "Unable to clear wishlist.");
  }
}

export const wishlistService = new WishlistServiceClass();
