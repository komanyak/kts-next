import Text from '@components/Text';

import styles from './AboutPage.module.scss';

export const metadata = {
  title: 'About - Lalasia',
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <Text view="title" tag="h1" className={styles.title}>
          About us
        </Text>
        <Text view="p-18" color="secondary" className={styles.description}>
          Information about our company will be available soon.
        </Text>
      </div>
    </div>
  );
}
