"use client";

import type { Product } from '@api/types';
import Button from '@components/Button';
import Card from '@components/Card';
import ProductsGridSkeleton from '@components/ProductsGridSkeleton';
import React, { useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';

import styles from './ProductsGrid.module.scss';

export type ProductsGridProps = {
  products: Product[];
  loading?: boolean;
  getImageUrl: (product: Product) => string;
  formatPrice: (price: number) => string;
  onAddToCart?: (product: Product) => void;
  showAddToCart?: boolean;
  onProductClick?: (productId: string) => void;
  buttonText?: string;
};

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  loading = false,
  getImageUrl,
  formatPrice,
  onAddToCart,
  showAddToCart = true,
  onProductClick,
  buttonText = 'Add to Cart',
}) => {
  const router = useRouter();

  const handleProductClick = useCallback(
    (productId: string) => {
      if (onProductClick) {
        onProductClick(productId);
      } else {
        router.push(`/product/${productId}`);
      }
    },
    [onProductClick, router]
  );

  const handleAddToCart = useCallback(
    (product: Product, event: React.MouseEvent) => {
      event.stopPropagation();
      if (onAddToCart) {
        onAddToCart(product);
      }
    },
    [onAddToCart]
  );

  if (loading) {
    return <ProductsGridSkeleton count={9} />;
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <div
          key={product.documentId}
          className={styles.productCard}
          onClick={() => handleProductClick(product.documentId)}
        >
          <Card
            image={getImageUrl(product)}
            captionSlot={product.productCategory.title || ''}
            title={product.title}
            subtitle={product.description}
            contentSlot={formatPrice(product.price)}
            actionSlot={
              showAddToCart && onAddToCart ? (
                <Button
                  className={styles.addToCartButton}
                  onClick={(event) => handleAddToCart(product, event)}
                >
                  {buttonText}
                </Button>
              ) : null
            }
          />
        </div>
      ))}
    </div>
  );
};

export default memo(ProductsGrid);
