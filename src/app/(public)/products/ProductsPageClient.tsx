'use client';

import Pagination from '@components/Pagination';
import ProductsGrid from '@components/ProductsGrid';
import TotalSection from '@components/TotalSection';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ProductsStore } from '@stores/ProductsStore';
import { useCartStore } from '@stores/StoreContext';
import { getProductImageUrl, formatPrice } from '@utils/productUtils';
import type { Product } from '@api/types';

import ErrorState from './components/ErrorState';
import SearchSection from './components/SearchSection';

interface ProductsPageClientProps {
  initialProducts: Product[];
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsPageClient: React.FC<ProductsPageClientProps> = observer(({ initialProducts, searchParams }) => {
  const productsStore = useMemo(() => new ProductsStore(), []);
  const cartStore = useCartStore();
  const router = useRouter();

  useEffect(() => {
    productsStore.setNavigate((url: string) => {
      router.push(url);
    });

   
    productsStore.products = initialProducts;
    
    const loadCategories = async () => {
      await productsStore.fetchAllCategories();

  
      const urlSearchParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
          urlSearchParams.set(key, Array.isArray(value) ? value[0] : value);
        }
      });

      productsStore.initializeFromURL(urlSearchParams);
    };

    loadCategories();
  }, [productsStore, searchParams, router, initialProducts]);

  if (productsStore.error) {
    return <ErrorState error={productsStore.error} />;
  }

  return (
    <>
      <SearchSection
        searchValue={productsStore.searchValue}
        onSearchChange={(value) => productsStore.setSearchValue(value)}
        onSearchClick={() => productsStore.performSearch()}
        selectedFilters={productsStore.selectedFilters}
        onFiltersChange={(filters) => productsStore.setSelectedFilters(filters)}
        filterOptions={productsStore.filterOptions}
        getFilterTitle={() => productsStore.filterTitle}
      />

      <TotalSection totalProducts={productsStore.totalProducts} />

      <ProductsGrid
        products={productsStore.paginatedProducts}
        loading={productsStore.loading}
        getImageUrl={(product) => getProductImageUrl(product, 'medium')}
        formatPrice={(price) => formatPrice(price)}
        onAddToCart={(product) => cartStore.addToCart(product)}
      />

      <Pagination
        currentPage={productsStore.currentPage}
        totalPages={productsStore.totalPages}
        onPageChange={(page) => productsStore.setCurrentPage(page)}
      />
    </>
  );
});

export default ProductsPageClient;
