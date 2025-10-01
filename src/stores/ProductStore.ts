import { productsApi } from '@api/products';
import type { Product } from '@api/types';
import { makeAutoObservable, runInAction } from 'mobx';

export class ProductStore {
  product: Product | null = null;

  relatedProducts: Product[] = [];

  loading = false;

  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProduct(id: string): Promise<void> {
    if (!id) {
      runInAction(() => {
        this.error = 'ID товара не найден';
        this.loading = false;
      });
      return;
    }

    try {
      runInAction(() => {
        this.loading = true;
        this.error = null;
      });

      const [productResponse, relatedResponse] = await Promise.all([
        productsApi.getProduct(id),
        productsApi.getProducts(),
      ]);

      runInAction(() => {
        this.product = productResponse.data;
        this.relatedProducts = relatedResponse.data.slice(0, 3);
        this.loading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при загрузке товара.';
        this.loading = false;
      });
    }
  }

  clearProduct(): void {
    this.product = null;
    this.relatedProducts = [];
    this.error = null;
  }
}
