import * as React from 'react';

import styles from './Header.module.scss';
import HeaderActions from './components/HeaderActions';
import Logo from './components/Logo';
import Navigation from './components/Navigation';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <Navigation />
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
