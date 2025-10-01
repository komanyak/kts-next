'use client';

import ProductsGrid from '@components/ProductsGrid';
import Text from '@components/Text';
import TotalSection from '@components/TotalSection';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useCartStore } from '@stores/StoreContext';
import { getProductImageUrl, formatPrice } from '@utils/productUtils';

import styles from './CartPage.module.scss';

const CartPageClient: React.FC = observer(() => {
  const cartStore = useCartStore();

  const handleRemoveFromCart = (product: { id: number }) => {
    cartStore.removeFromCart(product.id);
  };

  const cartProducts = cartStore.cartItems.map((item) => item.product);

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
        formatPrice={(price) => formatPrice(price)}
        onAddToCart={handleRemoveFromCart}
        showAddToCart={true}
        buttonText="Remove from Cart"
      />
    </div>
  );
});

export default CartPageClient;
