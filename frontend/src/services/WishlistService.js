import { normalizeId, normalizeIds } from "./shared/normalize";
import { BaseService } from "./BaseService";

class WishlistServiceClass extends BaseService {
  constructor() {
    super();
  }

  getWishlist() {
    return this.handleGetList("/wishlist", {
      dataKey: "items",
      normalize: normalizeId,
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