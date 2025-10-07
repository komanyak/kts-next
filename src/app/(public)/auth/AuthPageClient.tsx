'use client';

import Button from '@components/Button';
import Input from '@components/Input';
import Text from '@components/Text';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@stores/StoreContext';

import styles from './AuthPage.module.scss';

const AuthPageClient: React.FC = observer(() => {
  const authStore = useAuthStore();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await authStore.login({ identifier, password });
      } else {
        await authStore.register({ username, email, password });
      }

      router.push('/profile');
    } catch (error) {

      console.error('Auth error:', error);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    authStore.clearError();
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.authHeader}>
          <Text view="title" tag="h1" className={styles.title}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text view="p-18" color="secondary" className={styles.subtitle}>
            {isLogin
              ? 'Sign in to access your account'
              : 'Sign up to start shopping'}
          </Text>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {isLogin ? (
            <>
              <div className={styles.formGroup}>
                <Text view="p-16" weight="medium" className={styles.label}>
                  Email or Username
                </Text>
                <Input
                  value={identifier}
                  onChange={setIdentifier}
                  placeholder="Enter your email or username"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <Text view="p-16" weight="medium" className={styles.label}>
                  Password
                </Text>
                <Input
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.formGroup}>
                <Text view="p-16" weight="medium" className={styles.label}>
                  Username
                </Text>
                <Input
                  value={username}
                  onChange={setUsername}
                  placeholder="Choose a username"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <Text view="p-16" weight="medium" className={styles.label}>
                  Email
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <Text view="p-16" weight="medium" className={styles.label}>
                  Password
                </Text>
                <Input
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="Create a password"
                  required
                />
              </div>
            </>
          )}

          {authStore.error && (
            <div className={styles.errorMessage}>
              <Text view="p-16" color="secondary">
                {authStore.error}
              </Text>
            </div>
          )}

          <Button
            type="submit"
            className={styles.submitButton}
            disabled={authStore.loading}
          >
            {authStore.loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className={styles.authToggle}>
          <Text view="p-16" color="secondary">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Text>
          <button
            type="button"
            onClick={toggleMode}
            className={styles.toggleButton}
          >
            <Text view="p-16" color="accent" weight="medium">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
});

export default AuthPageClient;

