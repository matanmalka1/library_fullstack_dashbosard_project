export const normalizeItem = (item) => {
  if (!item) return null;
  return {
    bookId: item.bookId || item.book?._id || item.book,
    quantity: item.quantity,
    book: item.book,
  };
};

export const normalizeRole = (role) => {
  if (!role) return "USER";
  if (typeof role === "string") return role.toUpperCase();
  if (typeof role === "object" && role.name) return role.name.toUpperCase();
  return "USER";
};

export const stripPassword = (user) => {
  const { password: _password, ...userNoPass } = user;
  return userNoPass;
};

export const normalizeReview = (review) => {
  if (!review) return review;
  const normalized = (review.id || !review._id) ? review : { ...review, id: review._id };
  return normalized;
};

export const normalizeBook = (book) => {
  if (!book) return book;
  const normalized = (book.id || !book._id) ? book : { ...book, id: book._id };
  if (Array.isArray(normalized.reviews)) {
    normalized.reviews = normalized.reviews.map(normalizeReview);
  }
  return normalized;
};

export const normalizeUser = (user, { normalizeRole, roleIdByName } = {}) => {
  if (!user) return user;
  const normalized = user.id || !user._id ? user : { ...user, id: user._id };
  if (normalized.role && typeof normalized.role === "object") {
    const roleName = normalizeRole ? normalizeRole(normalized.role.name) : normalized.role.name;
    const roleId = normalized.role._id ? normalizeId(normalized.role._id) : null;
    if (roleName && roleId && roleIdByName) {
      roleIdByName.set(roleName, roleId);
    }
    normalized.role = roleName || normalized.role.name;
    if (roleId) {
      normalized.roleId = roleId;
    }
  } else if (normalized.role && normalizeRole) {
    normalized.role = normalizeRole(normalized.role);
  }
  if (!normalized.name && (normalized.firstName || normalized.lastName)) {
    normalized.name = `${normalized.firstName || ""} ${normalized.lastName || ""}`.trim();
  }
  // Check if user authenticated via OAuth
  normalized.isOAuthUser = !!(normalized.oauth?.google?.id || normalized.oauth?.github?.id);
  return normalized;
};

export const normalizeOrderItem = (item) => {
  if (!item) return item;
  const normalized = { ...item };
  if (normalized.book) {
    normalized.book = normalizeBook(normalized.book);
  }
  if (normalized.bookId) {
    normalized.bookId = normalizeId(normalized.bookId);
  }
  return normalized;
};

export const normalizeOrder = (order) => {
  if (!order) return order;
  const normalized = order.id || !order._id ? order : { ...order, id: order._id };
  if (Array.isArray(normalized.items)) {
    normalized.items = normalized.items.map(normalizeOrderItem);
  }
  normalized.date = normalized.placedAt || normalized.createdAt || normalized.date;
  return normalized;
};

export const normalizeCartItem = (item) => {
  if (!item) return item;
  const normalized = { ...item };
  if (normalized.book) {
    normalized.book = normalizeBook(normalized.book);
  }
  if (normalized.bookId) {
    normalized.bookId = normalizeId(normalized.bookId);
  }
  return normalized;
};

export const normalizeId = (value) => {
  if (value?.toString) return value.toString();
  return value;
};

export const normalizeIds = (items = []) => items.map(normalizeId);
