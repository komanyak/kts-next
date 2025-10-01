import { productsApi } from '@api/products';
import type { Product } from '@api/types';
import { makeAutoObservable, runInAction } from 'mobx';

export type FilterOption = {
  key: string;
  value: string;
};

export type Filter = {
  key: string;
  value: string;
};

export class ProductsStore {
  products: Product[] = [];
  allCategories: { documentId: string; title: string }[] = [];
  loading = false;
  error: string | null = null;
  searchValue = '';
  selectedFilters: Filter[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  private navigate?: (url: string) => void;
  private fetchPromise: Promise<void> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setNavigate(navigate: (url: string) => void) {
    this.navigate = navigate;
  }

  private updateURL() {
    if (!this.navigate) return;

    const params = new URLSearchParams();

    if (this.searchValue.trim()) {
      params.set('search', this.searchValue);
    }

    if (this.selectedFilters.length > 0) {
      params.set('filters', this.selectedFilters.map((f) => f.key).join(','));
    }

    if (this.currentPage > 1) {
      params.set('page', this.currentPage.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '';
    this.navigate(newUrl);
  }

  initializeFromURL(searchParams: URLSearchParams) {
    const search = searchParams.get('search') || '';
    this.searchValue = search;

    const filtersParam = searchParams.get('filters');
    if (filtersParam && this.allCategories.length > 0) {
      const filterKeys = filtersParam.split(',');
      this.selectedFilters = filterKeys
        .map((key) => {
          const category = this.allCategories.find((cat) => cat.documentId === key);
          return category ? { key: category.documentId, value: category.title } : null;
        })
        .filter((filter): filter is Filter => filter !== null);
    }

    const page = searchParams.get('page');
    this.currentPage = page ? Math.max(1, parseInt(page, 10)) : 1;

    if (search || this.selectedFilters.length > 0) {
      const categoryIds = this.selectedFilters.map((filter) => filter.key);
      this.fetchProducts(search, categoryIds.length > 0 ? categoryIds : undefined);
    }
  }

  get filterOptions(): FilterOption[] {
    return this.allCategories.map((category) => ({
      key: category.documentId,
      value: category.title,
    }));
  }

  get filteredProducts(): Product[] {
    return this.products;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  get totalProducts(): number {
    return this.filteredProducts.length;
  }

  get filterTitle(): string {
    if (this.selectedFilters.length === 0) return 'Filter';
    return this.selectedFilters.map((filter) => filter.value).join(', ');
  }

  async fetchProducts(searchQuery?: string, categoryIds?: string[]): Promise<void> {
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    this.fetchPromise = (async () => {
      try {
        runInAction(() => {
          this.loading = true;
          this.error = null;
        });

        const response = await productsApi.getProducts(searchQuery, categoryIds);

        runInAction(() => {
          this.products = response.data;
          this.loading = false;
        });
      } catch {
        runInAction(() => {
          this.error = 'Ошибка при загрузке товаров';
          this.loading = false;
        });
      } finally {
        this.fetchPromise = null;
      }
    })();

    return this.fetchPromise;
  }

  async fetchAllCategories(): Promise<void> {
    try {
      const response = await productsApi.getProducts();

      runInAction(() => {
        const categories = response.data
          .map((product) => product.productCategory)
          .filter((category): category is NonNullable<typeof category> => category != null)
          .reduce(
            (acc, category) => {
              if (!acc.find((cat) => cat.documentId === category.documentId)) {
                acc.push({
                  documentId: category.documentId,
                  title: category.title,
                });
              }
              return acc;
            },
            [] as { documentId: string; title: string }[]
          );

        this.allCategories = categories;
      });
    } catch {
      //
    }
  }

  setSearchValue(value: string): void {
    this.searchValue = value;
    this.resetPage();
  }

  performSearch(): void {
    const categoryIds = this.selectedFilters.map((filter) => filter.key);
    this.fetchProducts(this.searchValue, categoryIds.length > 0 ? categoryIds : undefined);
    this.updateURL();
  }

  setSelectedFilters(filters: Filter[]): void {
    this.selectedFilters = filters;
    this.resetPage();
    this.updateURL();

    const categoryIds = filters.map((filter) => filter.key);
    this.fetchProducts(this.searchValue, categoryIds.length > 0 ? categoryIds : undefined);
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.updateURL();
  }

  resetPage(): void {
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.selectedFilters = [];
    this.searchValue = '';
    this.resetPage();
    this.updateURL();
    this.fetchProducts();
  }
}
