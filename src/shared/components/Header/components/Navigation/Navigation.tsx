import Text from 'components/Text';
import { routes } from 'config/routes';
import React from 'react';
import { Link, useLocation } from 'react-router';

import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isProductsActive = React.useMemo(
    () => location.pathname === routes.products.mask || location.pathname === routes.main.mask,
    [location.pathname]
  );

  const isCategoriesActive = React.useMemo(
    () => location.pathname === routes.categories.mask,
    [location.pathname]
  );

  const isAboutActive = React.useMemo(
    () => location.pathname === routes.about.mask,
    [location.pathname]
  );

  return (
    <nav className={styles.navigation}>
      <Link
        to={routes.products.create()}
        className={`${styles.navLink} ${isProductsActive ? styles.navLinkActive : ''}`}
      >
        <Text view="p-18" color={isProductsActive ? 'accent' : 'primary'}>
          Products
        </Text>
      </Link>
      <Link
        to={routes.categories.create()}
        className={`${styles.navLink} ${isCategoriesActive ? styles.navLinkActive : ''}`}
      >
        <Text view="p-18" color={isCategoriesActive ? 'accent' : 'primary'}>
          Categories
        </Text>
      </Link>
      <Link
        to={routes.about.create()}
        className={`${styles.navLink} ${isAboutActive ? styles.navLinkActive : ''}`}
      >
        <Text view="p-18" color={isAboutActive ? 'accent' : 'primary'}>
          About us
        </Text>
      </Link>
    </nav>
  );
};

export default Navigation;
