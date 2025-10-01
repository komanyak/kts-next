'use client';

import type { Product } from '@api/types';
import Button from '@components/Button';
import Card from '@components/Card';
import Text from '@components/Text';
import React from 'react';
import { getProductImageUrl, formatPrice } from '@utils/productUtils';

import styles from './RelatedProducts.module.scss';

export type RelatedProductsProps = {
  products: Product[];
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  return (
    <div className={styles.relatedProducts}>
      <Text view="title" tag="h2" className={styles.title}>
        Related Items
      </Text>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <Card
            key={product.documentId}
            image={getProductImageUrl(product, 'medium')}
            captionSlot={product.productCategory?.title || ''}
            title={product.title}
            subtitle={product.description}
            contentSlot={formatPrice(product.price, product.discountPercent)}
            actionSlot={<Button className={styles.addToCartButton}>Add to Cart</Button>}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

