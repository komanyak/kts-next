import type { Product } from '@api/types';

export type CartItem = {
  product: Product;
  quantity: number;
  addedAt: string;
};

const CART_STORAGE_KEY = 'kts-cart';

export const cartStorage = {
  getCartItems(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveCartItems(items: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      //
    }
  },

  addToCart(product: Product, quantity = 1): CartItem[] {
    const items = this.getCartItems();
    const existingItemIndex = items.findIndex((item) => item.product.id === product.id);

    if (existingItemIndex >= 0) {
      items[existingItemIndex].quantity += quantity;
    } else {
      items.push({
        product,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }

    this.saveCartItems(items);
    return items;
  },

  removeFromCart(productId: number, quantity = 1): CartItem[] {
    const items = this.getCartItems();
    const existingItemIndex = items.findIndex((item) => item.product.id === productId);

    if (existingItemIndex >= 0) {
      const item = items[existingItemIndex];

      if (item.quantity <= quantity) {
        items.splice(existingItemIndex, 1);
      } else {
        item.quantity -= quantity;
      }

      this.saveCartItems(items);
    }

    return items;
  },

  clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
  },

  getTotalItems(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => {
      const price = item.product.price;
      const discount = item.product.discountPercent;
      const discountedPrice = price * (1 - discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  },

  isInCart(productId: number): boolean {
    const items = this.getCartItems();
    return items.some((item) => item.product.id === productId);
  },

  getCartItemQuantity(productId: number): number {
    const items = this.getCartItems();
    const item = items.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  },
};
