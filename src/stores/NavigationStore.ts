import { makeObservable } from 'mobx';

export type LocationState = {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
};

export class NavigationStore {
  currentLocation: LocationState = {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
  };

  constructor() {
    makeObservable(this, {
      currentLocation: true,
      updateLocation: true,
    });
  }

  updateLocation(location: LocationState): void {
    this.currentLocation = { ...location };
  }

  get isProductsPage(): boolean {
    return this.currentLocation.pathname === '/products';
  }

  get isCartPage(): boolean {
    return this.currentLocation.pathname === '/cart';
  }

  get isCategoriesPage(): boolean {
    return this.currentLocation.pathname === '/categories';
  }

  get isAboutPage(): boolean {
    return this.currentLocation.pathname === '/about';
  }

  get isProductDetailPage(): boolean {
    return /^\/product\/\d+$/.test(this.currentLocation.pathname);
  }

  get currentProductId(): number | null {
    const match = this.currentLocation.pathname.match(/^\/product\/(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  }
}
