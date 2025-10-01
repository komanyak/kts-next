'use client';

import type { Product } from '@api/types';
import Button from '@components/Button';
import Card from '@components/Card';
import Text from '@components/Text';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getProductImageUrl, formatPrice } from '@utils/productUtils';

import styles from './RelatedProducts.module.scss';

export type RelatedProductsProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, onAddToCart }) => {
  const router = useRouter();

  const handleProductClick = useCallback((productId: string) => {
    router.push(`/product/${productId}`);
  }, [router]);

  const handleAddToCart = useCallback((product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    onAddToCart(product);
  }, [onAddToCart]);

  return (
    <div className={styles.relatedProducts}>
      <Text view="title" tag="h2" className={styles.title}>
        Related Items
      </Text>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div
            key={product.documentId}
            className={styles.productCard}
            onClick={() => handleProductClick(product.documentId)}
          >
            <Card
              image={getProductImageUrl(product, 'medium')}
              captionSlot={product.productCategory?.title || ''}
              title={product.title}
              subtitle={product.description}
              contentSlot={formatPrice(product.price, product.discountPercent)}
              actionSlot={
                <Button 
                  className={styles.addToCartButton}
                  onClick={(event) => handleAddToCart(product, event)}
                >
                  Add to Cart
                </Button>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

