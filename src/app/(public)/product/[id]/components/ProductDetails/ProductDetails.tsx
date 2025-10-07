'use client';

import type { Product } from '@api/types';
import Button from '@components/Button';
import Text from '@components/Text';
import ArrowLeftIcon from '@icons/ArrowLeftIcon';
import ArrowRightIcon from '@icons/ArrowRightIcon';
import CheckIcon from '@icons/CheckIcon';
import Image from 'next/image';
import React, { useState } from 'react';
import { useCartStore } from '@stores/StoreContext';
import { observer } from 'mobx-react-lite';
import { getImageUrl, formatPrice } from '@utils/productUtils';

import styles from './ProductDetails.module.scss';

export type ProductDetailsProps = {
  product: Product;
};

const ProductDetails: React.FC<ProductDetailsProps> = observer(({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cartStore = useCartStore();
  
  const isInCart = cartStore.isInCart(product.id);
  const cartQuantity = cartStore.cartItemQuantity(product.id);

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
            {isInCart && (
              <div className={styles.inCartIndicator}>
                <CheckIcon width={20} height={20} color="accent" />
                <Text view="p-16" color="accent" weight="medium">
                  In Cart ({cartQuantity})
                </Text>
              </div>
            )}
            <div className={styles.actionButtons}>
              <Button className={styles.buyNowButton}>Buy Now</Button>
              <Button className={styles.addToCartButton} onClick={handleAddToCart}>
                {isInCart ? 'Add More' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductDetails;

