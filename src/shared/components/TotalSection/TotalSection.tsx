import Text from 'components/Text';
import React, { memo, useMemo } from 'react';

import styles from './TotalSection.module.scss';

export type TotalSectionProps = {
  totalProducts: number;
  label?: string;
  formatValue?: (value: number) => string;
};

const TotalSection: React.FC<TotalSectionProps> = ({
  totalProducts,
  label = 'Total products',
  formatValue,
}) => {
  const displayValue = useMemo(() => {
    return formatValue ? formatValue(totalProducts) : totalProducts.toString();
  }, [totalProducts, formatValue]);

  return (
    <div className={styles.totalSection}>
      <Text view="subtitle" color="primary">
        {label}
      </Text>
      <Text view="p-20" color="accent" weight="bold">
        {displayValue}
      </Text>
    </div>
  );
};

export default memo(TotalSection);
