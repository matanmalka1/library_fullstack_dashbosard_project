import { httpClient } from "./shared/httpClient";
import { normalizeIds } from "./shared/normalize";
import { BaseService } from "./BaseService";

class WishlistServiceClass extends BaseService {
  constructor() {
    super();
    this.httpClient = httpClient;
  }

  getWishlist() {
    return this.handleGetList("/wishlist", {
      dataKey: "items",
      normalize: (items) => normalizeIds(items),
      fallback: "Unable to load wishlist."
    });
  }

  toggleWishlist(_userId, bookId) {
    return this.handlePost("/wishlist/toggle", 
      { bookId },
      {
        normalize: (data) => normalizeIds(data?.items || []),
        fallback: "Unable to update wishlist."
      }
    );
  }

  clearWishlist() {
    return this.handleDelete("/wishlist", {
      fallback: "Unable to clear wishlist."
    });
  }
}

export const wishlistService = new WishlistServiceClass();