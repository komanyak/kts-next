'use client';

import Text from '@components/Text';
import ArrowLeftIcon from '@icons/ArrowLeftIcon';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ProductStore } from '@stores/ProductStore';
import { useCartStore } from '@stores/StoreContext';
import type { Product } from '@api/types';

import styles from './ProductPage.module.scss';
import ProductDetails from './components/ProductDetails';
import RelatedProducts from './components/RelatedProducts';

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductPageClient: React.FC<ProductPageClientProps> = observer(({ product, relatedProducts }) => {
  const router = useRouter();
  const productStore = useMemo(() => new ProductStore(), []);
  const cartStore = useCartStore();

  useEffect(() => {
    productStore.product = product;
    productStore.relatedProducts = relatedProducts;
  }, [product, relatedProducts, productStore]);

  const handleBackClick = () => {
    router.push('/products');
  };

  const handleAddToCart = (product: Product) => {
    cartStore.addToCart(product);
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.backButton} onClick={handleBackClick}>
        <ArrowLeftIcon width={32} height={32} />
        <Text view="p-20">Назад</Text>
      </div>

      <ProductDetails product={product} />

      <RelatedProducts products={relatedProducts} onAddToCart={handleAddToCart} />
    </div>
  );
});

export default ProductPageClient;
