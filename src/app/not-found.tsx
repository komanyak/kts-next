import Link from 'next/link';
import Text from '@components/Text';

import styles from './not-found.module.scss';

export const metadata = {
  title: '404 - Page Not Found - Lalasia',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <Text view="title" tag="h1" className={styles.title}>
          404 - Page Not Found
        </Text>
        <Text view="p-18" color="secondary" className={styles.description}>
          The page you are looking for does not exist or has been moved.
        </Text>
        <Link href="/products" className={styles.link}>
          Go back to products
        </Link>
      </div>
    </div>
  );
}
