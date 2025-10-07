'use client';

import Button from '@components/Button';
import Text from '@components/Text';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@stores/StoreContext';

import styles from './ProfilePage.module.scss';

const ProfilePageClient: React.FC = observer(() => {
  const authStore = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !authStore.isAuthenticated) {
      router.push('/auth');
    }
  }, [mounted, authStore.isAuthenticated, router]);

  if (!mounted || !authStore.isAuthenticated || !authStore.user) {
    return null;
  }

  const handleLogout = () => {
    authStore.logout();
    router.push('/products');
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <Text view="title" tag="h1" className={styles.title}>
            My Profile
          </Text>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <Text view="p-16" color="secondary" weight="medium">
                Username
              </Text>
              <Text view="p-20" weight="bold">
                {authStore.user.username}
              </Text>
            </div>

            <div className={styles.infoItem}>
              <Text view="p-16" color="secondary" weight="medium">
                Email
              </Text>
              <Text view="p-20" weight="bold">
                {authStore.user.email}
              </Text>
            </div>

            <div className={styles.infoItem}>
              <Text view="p-16" color="secondary" weight="medium">
                Account Status
              </Text>
              <div className={styles.statusBadge}>
                <Text view="p-16" color="accent" weight="medium">
                  {authStore.user.confirmed ? '✓ Confirmed' : 'Pending'}
                </Text>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Text view="p-16" color="secondary" weight="medium">
                Member Since
              </Text>
              <Text view="p-18">
                {new Date(authStore.user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </div>
          </div>

          <div className={styles.actionsSection}>
            <Button className={styles.logoutButton} onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfilePageClient;

