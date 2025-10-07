'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useThemeStore } from '@stores/StoreContext';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = observer(() => {
  const themeStore = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

    if (!mounted) {
    return (
      <div className={styles.themeToggle} aria-label="Toggle theme">
        <span className={styles.toggleTrack}>
          <span className={styles.toggleThumb}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="4" fill="currentColor"/>
              <path d="M8 0V2M8 14V16M16 8H14M2 8H0M13.6569 13.6569L12.2426 12.2426M3.75736 3.75736L2.34315 2.34315M13.6569 2.34315L12.2426 3.75736M3.75736 12.2426L2.34315 13.6569" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
        </span>
      </div>
    );
  }

  return (
    <button
      className={styles.themeToggle}
      onClick={() => themeStore.toggleTheme()}
      aria-label="Toggle theme"
      title={`Switch to ${themeStore.theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={styles.toggleTrack}>
        <span 
          className={`${styles.toggleThumb} ${themeStore.theme === 'dark' ? styles.dark : ''}`}
        >
          {themeStore.theme === 'light' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="4" fill="currentColor"/>
              <path d="M8 0V2M8 14V16M16 8H14M2 8H0M13.6569 13.6569L12.2426 12.2426M3.75736 3.75736L2.34315 2.34315M13.6569 2.34315L12.2426 3.75736M3.75736 12.2426L2.34315 13.6569" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3"/>
            </svg>
          )}
        </span>
      </span>
    </button>
  );
});

export default ThemeToggle;

