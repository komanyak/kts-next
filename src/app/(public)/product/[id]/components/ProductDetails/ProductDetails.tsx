'use client';

import type { Product } from '@api/types';
import Button from '@components/Button';
import Text from '@components/Text';
import ArrowLeftIcon from '@icons/ArrowLeftIcon';
import ArrowRightIcon from '@icons/ArrowRightIcon';
import Image from 'next/image';
import React, { useState } from 'react';
import { useCartStore } from '@stores/StoreContext';
import { getImageUrl, formatPrice } from '@utils/productUtils';

import styles from './ProductDetails.module.scss';

export type ProductDetailsProps = {
  product: Product;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cartStore = useCartStore();

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    cartStore.addToCart(product);
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.imageContainer}>
        <div className={styles.mainImage}>
          <Image 
            src={getImageUrl(product.images, currentImageIndex, 'large')} 
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className={styles.navigationArrows}>
            <Button className={styles.arrowButton} onClick={handlePreviousImage}>
              <ArrowLeftIcon width={30} height={30} style={{ color: 'white' }} strokeWidth={3} />
            </Button>
            <Button
              className={`${styles.arrowButton} ${styles.arrowButtonSecondary}`}
              onClick={handleNextImage}
            >
              <ArrowRightIcon width={30} height={30} style={{ color: 'white' }} strokeWidth={3} />
            </Button>
          </div>
        )}
      </div>

      <div className={styles.productInfo}>
        <div className={styles.productHeader}>
          <Text view="title" tag="h1" className={styles.productTitle}>
            {product.title}
          </Text>
          <Text view="p-20" color="secondary" className={styles.productDescription}>
            {product.description}
          </Text>
        </div>

        <div className={styles.productActions}>
          <div className={styles.priceSection}>
            <Text view="title" className={styles.price}>
              {formatPrice(product.price, product.discountPercent)}
            </Text>
            <div className={styles.actionButtons}>
              <Button className={styles.buyNowButton}>Buy Now</Button>
              <Button className={styles.addToCartButton} onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

