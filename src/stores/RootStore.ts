import { AuthStore } from './AuthStore';
import { CartStore } from './CartStore';
import { NavigationStore } from './NavigationStore';
import { ProductStore } from './ProductStore';
import { ProductsStore } from './ProductsStore';
import { ThemeStore } from './ThemeStore';

export class RootStore {
  authStore = new AuthStore();
  cartStore = new CartStore();
  navigationStore = new NavigationStore();
  productStore = new ProductStore();
  productsStore = new ProductsStore();
  themeStore = new ThemeStore();
}

export const rootStore = new RootStore();
