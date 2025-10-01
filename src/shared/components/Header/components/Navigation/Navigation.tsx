"use client";

import Text from '@components/Text';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const isProductsActive = React.useMemo(
    () => pathname === '/products' || pathname === '/',
    [pathname]
  );

  const isCategoriesActive = React.useMemo(
    () => pathname === '/categories',
    [pathname]
  );

  const isAboutActive = React.useMemo(
    () => pathname === '/about',
    [pathname]
  );

  return (
    <nav className={styles.navigation}>
      <Link
        href="/products"
        className={`${styles.navLink} ${isProductsActive ? styles.navLinkActive : ''}`}
      >
        <Text view="p-18" color={isProductsActive ? 'accent' : 'primary'}>
          Products
        </Text>
      </Link>
      <Link
        href="/categories"
        className={`${styles.navLink} ${isCategoriesActive ? styles.navLinkActive : ''}`}
      >
        <Text view="p-18" color={isCategoriesActive ? 'accent' : 'primary'}>
          Categories
        </Text>
      </Link>
      <Link
        href="/about"
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
