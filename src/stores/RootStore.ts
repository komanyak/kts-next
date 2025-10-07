import { AuthStore } from './AuthStore';
import { CartStore } from './CartStore';
import { NavigationStore } from './NavigationStore';
import { ProductStore } from './ProductStore';
import { ProductsStore } from './ProductsStore';

export class RootStore {
  authStore = new AuthStore();
  cartStore = new CartStore();
  navigationStore = new NavigationStore();
  productStore = new ProductStore();
  productsStore = new ProductsStore();
}

export const rootStore = new RootStore();
