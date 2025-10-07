"use client";

import Text from '@components/Text';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './MobileMenu.module.scss';

export type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
    <>
 
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
     
      <nav className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.menuContent}>
          <Link
            href="/products"
            className={`${styles.menuLink} ${isProductsActive ? styles.menuLinkActive : ''}`}
            onClick={onClose}
          >
            <Text view="p-20" color={isProductsActive ? 'accent' : 'primary'} weight="medium">
              Products
            </Text>
          </Link>
          <Link
            href="/categories"
            className={`${styles.menuLink} ${isCategoriesActive ? styles.menuLinkActive : ''}`}
            onClick={onClose}
          >
            <Text view="p-20" color={isCategoriesActive ? 'accent' : 'primary'} weight="medium">
              Categories
            </Text>
          </Link>
          <Link
            href="/about"
            className={`${styles.menuLink} ${isAboutActive ? styles.menuLinkActive : ''}`}
            onClick={onClose}
          >
            <Text view="p-20" color={isAboutActive ? 'accent' : 'primary'} weight="medium">
              About us
            </Text>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;

