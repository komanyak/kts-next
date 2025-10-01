import { serverProductsApi } from '@api/server';
import HeroSection from './components/HeroSection';
import ProductsPageClient from './ProductsPageClient';

import styles from './ProductsPage.module.scss';

export const metadata = {
  title: 'Products - Lalasia',
  description: 'Browse our wide selection of products - furniture, electronics, shoes, and more. Find everything you need in one place.',
};


let cachedCategories: Awaited<ReturnType<typeof serverProductsApi.getAllCategories>> | null = null;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  

  if (!cachedCategories) {
    cachedCategories = await serverProductsApi.getAllCategories();
  }
  
  return (
    <div className={styles.productsPage}>
      <HeroSection />
      
      <ProductsPageClient 
        categories={cachedCategories} 
        searchParams={resolvedSearchParams} 
      />
    </div>
  );
}
