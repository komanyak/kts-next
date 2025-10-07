import { makeAutoObservable, runInAction } from 'mobx';
import type { ThemeType } from '@/shared/config/theme';

const THEME_STORAGE_KEY = 'kts-theme';

export class ThemeStore {
  theme: ThemeType = 'light';

  constructor() {
    makeAutoObservable(this);
    this.loadThemeFromStorage();
  }

  private loadThemeFromStorage(): void {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      runInAction(() => {
        this.theme = savedTheme;
      });
    }
  }

  private saveThemeToStorage(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(THEME_STORAGE_KEY, this.theme);
  }

  setTheme(theme: ThemeType): void {
    this.theme = theme;
    this.saveThemeToStorage();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.saveThemeToStorage();
  }
}

