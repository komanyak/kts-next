import CardSkeleton from 'components/CardSkeleton';
import React from 'react';

import styles from './ProductsGridSkeleton.module.scss';

export type ProductsGridSkeletonProps = {
  count?: number;
};

const ProductsGridSkeleton: React.FC<ProductsGridSkeletonProps> = ({ count = 9 }) => {
  return (
    <div className={styles.productsGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.productCard}>
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default ProductsGridSkeleton;
