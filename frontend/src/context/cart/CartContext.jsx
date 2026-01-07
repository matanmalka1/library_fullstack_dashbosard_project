import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useAuth } from "../auth/AuthContext";
import { cartService } from "../../services/CartService";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const hasLoadedRef = useRef(false);
  const syncTimeoutRef = useRef(null);

  useEffect(() => {
    let isActive = true;
    const loadCart = async () => {
      if (!user) {
        hasLoadedRef.current = false;
        setItems([]);
        return;
      }
      try {
        const cartItems = await cartService.getCart(user.id);
        if (isActive) {
          setItems(cartItems);
          hasLoadedRef.current = true;
        }
      } catch {
        if (isActive) {
          setItems([]);
          hasLoadedRef.current = true;
        }
      }
    };

    loadCart();

    return () => {
      isActive = false;
    };
  }, [user]);

  useEffect(() => {
    if (!user || !hasLoadedRef.current) {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = null;
      }
      return;
    }

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(() => {
      cartService.saveCart(user.id, items).catch(() => {
        // Ignore sync errors.
      });
    }, 300);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = null;
      }
    };
  }, [items, user]);

  const addToCart = (book, quantity = 1) => {
    setItems((prev) => {
      const available = Number(book?.stockQuantity);
      const hasStockLimit = Number.isFinite(available);
      const existing = prev.find((i) => i.bookId === book.id);
      if (existing) {
        if (hasStockLimit && existing.quantity >= available) {
          return prev;
        }
        return prev.map((i) =>
          i.bookId === book.id
            ? {
                ...i,
                quantity: hasStockLimit
                  ? Math.min(i.quantity + quantity, available)
                  : i.quantity + quantity,
              }
            : i
        );
      }
      if (hasStockLimit && quantity > available) {
        return [...prev, { bookId: book.id, quantity: available, book }];
      }
      return [...prev, { bookId: book.id, quantity, book }];
    });
  };

  const removeFromCart = (bookId) => {
    setItems((prev) => prev.filter((i) => i.bookId !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => {
        if (i.bookId !== bookId) return i;
        const available = Number(i.book?.stockQuantity);
        const hasStockLimit = Number.isFinite(available);
        const nextQty = hasStockLimit
          ? Math.min(quantity, available)
          : quantity;
        return { ...i, quantity: nextQty };
      })
    );
  };

  const clearCart = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(
    () =>
      items.reduce(
        (acc, item) => ({
          totalItems: acc.totalItems + item.quantity,
          totalPrice: acc.totalPrice + item.book.price * item.quantity,
        }),
        { totalItems: 0, totalPrice: 0 }
      ),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
