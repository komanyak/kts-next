'use client';

import ProductsGrid from '@components/ProductsGrid';
import Text from '@components/Text';
import Button from '@components/Button';
import TotalSection from '@components/TotalSection';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@stores/StoreContext';
import { getProductImageUrl, formatPrice } from '@utils/productUtils';

import styles from './CartPage.module.scss';

const CartPageClient: React.FC = observer(() => {
  const cartStore = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemoveFromCart = (product: { id: number }) => {
    cartStore.removeFromCart(product.id);
  };

  const getQuantity = (product: { id: number }) => {
    return cartStore.cartItemQuantity(product.id);
  };

  const handleGoToProducts = () => {
    router.push('/products');
  };

  const cartProducts = cartStore.cartItems.map((item) => item.product);

  if (!mounted) {
    return null;
  }

  if (cartStore.error) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.errorState}>
          <Text view="p-18" color="secondary">
            {cartStore.error}
          </Text>
        </div>
      </div>
    );
  }

  if (cartStore.cartItems.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.emptyCart}>
          <Text view="title" tag="h1" className={styles.emptyCartTitle}>
            Your Cart is Empty
          </Text>
          <Text view="p-20" color="secondary" className={styles.emptyCartSubtitle}>
            Looks like you haven&apos;t added anything to your cart yet
          </Text>
          <Button className={styles.shopButton} onClick={handleGoToProducts}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <TotalSection totalProducts={cartStore.totalItems} label="Total items in cart" />
      <TotalSection
        totalProducts={cartStore.totalPrice}
        label="Total price"
        formatValue={(price) => formatPrice(price)}
      />

      <ProductsGrid
        products={cartProducts}
        loading={cartStore.loading}
        getImageUrl={(product) => getProductImageUrl(product, 'medium')}
        formatPrice={(price, discount) => formatPrice(price, discount)}
        onAddToCart={handleRemoveFromCart}
        showAddToCart={true}
        buttonText="Remove from Cart"
        getQuantity={getQuantity}
      />
    </div>
  );
});

export default CartPageClient;
