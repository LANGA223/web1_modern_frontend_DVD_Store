import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContext';
import { getProductById } from '../data/products';

const STORAGE_KEY = 'w401_cart';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // items: [{ id, qty }]
  const [items, setItems] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, qty }];
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  // Join cart items with product data for display / totals.
  const detailed = useMemo(
    () =>
      items
        .map((i) => {
          const product = getProductById(i.id);
          if (!product) return null;
          return { ...i, product, lineTotal: product.price * i.qty };
        })
        .filter(Boolean),
    [items]
  );

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => detailed.reduce((sum, i) => sum + i.lineTotal, 0),
    [detailed]
  );

  const value = useMemo(
    () => ({ items, detailed, count, subtotal, addItem, updateQty, removeItem, clear }),
    [items, detailed, count, subtotal, addItem, updateQty, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
