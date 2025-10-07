"use client";

import * as React from 'react';
import BurgerIcon from '@icons/BurgerIcon';

import styles from './Header.module.scss';
import HeaderActions from './components/HeaderActions';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import MobileMenu from './components/MobileMenu';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={styles.burgerButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <BurgerIcon isOpen={isMobileMenuOpen} color="#518581" />
        </button>
        <Logo />
        <Navigation />
        <HeaderActions />
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Header;
