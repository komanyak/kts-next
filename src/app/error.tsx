'use client';

import { useEffect } from 'react';
import Text from '@components/Text';

import styles from './error.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.error}>
      <div className={styles.container}>
        <Text view="title" tag="h1" className={styles.title}>
          Something went wrong!
        </Text>
        <Text view="p-18" color="secondary" className={styles.description}>
          An error occurred while loading this page.
        </Text>
        <button onClick={reset} className={styles.button}>
          Try again
        </button>
      </div>
    </div>
  );
}
