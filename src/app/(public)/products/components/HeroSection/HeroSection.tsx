import Text from '@components/Text';
import React from 'react';

import styles from './HeroSection.module.scss';

const HeroSection: React.FC = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.content}>
        <Text view="title" color="primary" className={styles.title}>
          Products
        </Text>
        <Text view="p-20" color="secondary" className={styles.description}>
          We display products based on the latest products we have, if you want
          <br />
          to see our old products please enter the name of the item
        </Text>
      </div>
    </div>
  );
};

export default HeroSection;
