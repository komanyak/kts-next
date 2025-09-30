import { routes } from 'config/routes';
import BagIcon from 'icons/BagIcon';
import UserIcon from 'icons/UserIcon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router';
import { useCartStore } from 'stores/StoreContext';

import styles from './HeaderActions.module.scss';

const HeaderActions: React.FC = observer(() => {
  const navigate = useNavigate();
  const cartStore = useCartStore();

  const handleCartClick = () => {
    navigate(routes.cart.create());
  };

  return (
    <div className={styles.icons}>
      <button className={styles.iconButton} aria-label="Shopping bag" onClick={handleCartClick}>
        <BagIcon />
        {cartStore.totalItems > 0 && (
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
