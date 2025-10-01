import { Suspense } from 'react';
import HeroSection from './components/HeroSection';
import ProductsContent from './components/ProductsContent';
import ProductsLoadingFallback from './components/ProductsLoadingFallback';

import styles from './ProductsPage.module.scss';

export const metadata = {
  title: 'Products - Lalasia',
  description: 'Browse our collection of beautiful furniture and home decor products.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  return (
    <div className={styles.productsPage}>
      <HeroSection />
      
      <Suspense fallback={<ProductsLoadingFallback />}>
        <ProductsContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
