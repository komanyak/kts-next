import type { Product } from '@api/types';
import { makeObservable, runInAction } from 'mobx';
import { cartStorage, type CartItem } from '@utils/cartStorage';

export class CartStore {
  cartItems: CartItem[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      cartItems: true,
      loading: true,
      error: true,
      totalItems: true,
      totalPrice: true,
      isInCart: true,
      cartItemQuantity: true,
      loadCartItems: true,
      addToCart: true,
      removeFromCart: true,
      clearCart: true,
      clearError: true,
    });
    this.loadCartItems();
    this.setupStorageListener();
  }

  private setupStorageListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'kts-cart') {
          this.loadCartItems();
        }
      });
    }
  }

  get totalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const price = item.product.price;
      const discount = item.product.discountPercent;
      const discountedPrice = price * (1 - discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  }

  get isInCart(): (productId: number) => boolean {
    return (productId: number) => {
      return this.cartItems.some((item) => item.product.id === productId);
    };
  }

  get cartItemQuantity(): (productId: number) => number {
    return (productId: number) => {
      const item = this.cartItems.find((item) => item.product.id === productId);
      return item ? item.quantity : 0;
    };
  }

  loadCartItems(): void {
    runInAction(() => {
      this.cartItems = cartStorage.getCartItems();
    });
  }

  addToCart(product: Product, quantity = 1): void {
    try {
      runInAction(() => {
        this.loading = true;
        this.error = null;
      });

      const updatedItems = cartStorage.addToCart(product, quantity);

      runInAction(() => {
        this.cartItems = updatedItems;
        this.loading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при добавлении товара в корзину';
        this.loading = false;
      });
    }
  }

  removeFromCart(productId: number, quantity = 1): void {
    try {
      runInAction(() => {
        this.loading = true;
        this.error = null;
      });

      const updatedItems = cartStorage.removeFromCart(productId, quantity);

      runInAction(() => {
        this.cartItems = updatedItems;
        this.loading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при удалении товара из корзины';
        this.loading = false;
      });
    }
  }

  clearCart(): void {
    cartStorage.clearCart();
    runInAction(() => {
      this.cartItems = [];
    });
  }

  clearError(): void {
    this.error = null;
  }
}
