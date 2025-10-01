"use client";

import BagIcon from '@icons/BagIcon';
import UserIcon from '@icons/UserIcon';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@stores/StoreContext';

import styles from './HeaderActions.module.scss';

const HeaderActions: React.FC = observer(() => {
  const router = useRouter();
  const cartStore = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <div className={styles.icons}>
      <button className={styles.iconButton} aria-label="Shopping bag" onClick={handleCartClick}>
        <BagIcon />
        {mounted && cartStore.totalItems > 0 && (
          <span className={styles.cartBadge}>{cartStore.totalItems}</span>
        )}
      </button>
      <button className={styles.iconButton} aria-label="User profile">
        <UserIcon />
      </button>
    </div>
  );
});

export default HeaderActions;
