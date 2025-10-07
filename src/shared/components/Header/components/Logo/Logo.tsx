import Text from '@components/Text';
import React from 'react';

import styles from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.logoIcon}>
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.9035 20.601L31.9655 24.101H13.6535L8.66949 5.50549H12.2955L16.338 20.601H32.9035Z"
            fill="var(--logo-brown)"
          />
          <path d="M31.402 26.201L30.464 29.701H9.60749L8.66949 26.201H31.402Z" fill="var(--brand)" />
          <path d="M29.9005 31.801L28.9625 35.301H14.5915L13.6535 31.801H29.9005Z" fill="var(--logo-light-green)" />
        </svg>
      </div>
      <Text view="p-18" weight="bold" className={styles.logoText}>
        Lalasia
      </Text>
    </div>
  );
};

export default Logo;
