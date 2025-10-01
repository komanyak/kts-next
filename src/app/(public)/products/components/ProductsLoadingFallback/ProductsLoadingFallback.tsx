import TotalSection from '@components/TotalSection';
import ProductsGridSkeleton from '@components/ProductsGridSkeleton';
import React from 'react';

const ProductsLoadingFallback: React.FC = () => {
  return (
    <>
      <TotalSection totalProducts={0} />
      <ProductsGridSkeleton count={9} />
    </>
  );
};

export default ProductsLoadingFallback;

