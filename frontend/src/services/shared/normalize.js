export const normalizeItem = (item) => ({
  bookId: item.bookId || item.book?._id || item.book,
  quantity: item.quantity,
  book: item.book,
});

export const normalizeId = (value) => {
  if (value?.toString) return value.toString();
  return value;
};

export const normalizeIds = (items = []) => items.map(normalizeId);

