import Text from '@components/Text';
import React from 'react';

import styles from './ErrorState.module.scss';

export type ErrorStateProps = {
  error: string;
};

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className={styles.errorContainer}>
      <Text view="p-20" color="primary">
        {error}
      </Text>
    </div>
  );
};

export default ErrorState;
