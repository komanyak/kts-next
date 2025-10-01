import Text from '@components/Text';

import styles from './CategoriesPage.module.scss';

export const metadata = {
  title: 'Categories - Lalasia',
  description: 'Browse our product categories - furniture, electronics, shoes, and more. Find exactly what you need.',
};

export default function CategoriesPage() {
  return (
    <div className={styles.categoriesPage}>
      <div className={styles.container}>
        <Text view="title" tag="h1" className={styles.title}>
          Categories
        </Text>
        <Text view="p-18" color="secondary" className={styles.description}>
          Categories will be available soon.
        </Text>
      </div>
    </div>
  );
}
