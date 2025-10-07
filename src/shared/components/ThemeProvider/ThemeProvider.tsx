'use client';

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useThemeStore } from '@stores/StoreContext';
import { themes } from '@/shared/config/theme';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = observer(({ children }) => {
  const themeStore = useThemeStore();
  const currentTheme = themes[themeStore.theme];

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--page-bg', currentTheme.pageBg);
    root.style.setProperty('--loader-bg', currentTheme.loaderBg);
    
    root.style.setProperty('--button-primary-bg', currentTheme.buttonPrimaryBg);
    root.style.setProperty('--button-primary-text', currentTheme.buttonPrimaryText);
    root.style.setProperty('--button-primary-bg-hover', currentTheme.buttonPrimaryBgHover);
    root.style.setProperty('--button-primary-text-hover', currentTheme.buttonPrimaryTextHover);
    root.style.setProperty('--button-primary-bg-disabled', currentTheme.buttonPrimaryBgDisabled);
    root.style.setProperty('--button-primary-text-disabled', currentTheme.buttonPrimaryTextDisabled);
    root.style.setProperty('--button-primary-bg-active', currentTheme.buttonPrimaryBgActive);
    root.style.setProperty('--button-primary-text-active', currentTheme.buttonPrimaryTextActive);
    
    root.style.setProperty('--text-primary', currentTheme.textPrimary);
    root.style.setProperty('--text-secondary', currentTheme.textSecondary);
    root.style.setProperty('--text-accent', currentTheme.textAccent);
    
    root.style.setProperty('--input-text', currentTheme.inputText);
    root.style.setProperty('--input-bg', currentTheme.inputBg);
    root.style.setProperty('--input-placeholder', currentTheme.inputPlaceholder);
    root.style.setProperty('--input-border', currentTheme.inputBorder);
    root.style.setProperty('--input-bg-focus', currentTheme.inputBgFocus);
    root.style.setProperty('--input-border-focus', currentTheme.inputBorderFocus);
    root.style.setProperty('--input-text-focus', currentTheme.inputTextFocus);
    root.style.setProperty('--input-bg-disabled', currentTheme.inputBgDisabled);
    root.style.setProperty('--input-border-disabled', currentTheme.inputBorderDisabled);
    root.style.setProperty('--input-text-disabled', currentTheme.inputTextDisabled);
    
    root.style.setProperty('--checkbox-bg', currentTheme.checkboxBg);
    root.style.setProperty('--checkbox-border', currentTheme.checkboxBorder);
    root.style.setProperty('--checkbox-bg-hover', currentTheme.checkboxBgHover);
    root.style.setProperty('--checkbox-border-hover', currentTheme.checkboxBorderHover);
    root.style.setProperty('--checkbox-bg-disabled', currentTheme.checkboxBgDisabled);
    root.style.setProperty('--checkbox-border-disabled', currentTheme.checkboxBorderDisabled);
    root.style.setProperty('--checkbox-check', currentTheme.checkboxCheck);
    root.style.setProperty('--checkbox-check-hover', currentTheme.checkboxCheckHover);
    root.style.setProperty('--checkbox-check-disabled', currentTheme.checkboxCheckDisabled);
    
    root.style.setProperty('--card-image-bg', currentTheme.cardImageBg);
    root.style.setProperty('--card-bg', currentTheme.cardBg);
    root.style.setProperty('--dropdown-options-bg', currentTheme.dropdownOptionsBg);
    
    root.style.setProperty('--brand', currentTheme.brand);
    root.style.setProperty('--brand-active', currentTheme.brandActive);
    root.style.setProperty('--brand-hover', currentTheme.brandHover);
    
    root.style.setProperty('--header-bg', currentTheme.headerBg);
    root.style.setProperty('--header-border', currentTheme.headerBorder);
    root.style.setProperty('--logo-brown', currentTheme.logoBrown);
    root.style.setProperty('--logo-light-green', currentTheme.logoLightGreen);
    
    root.setAttribute('data-theme', themeStore.theme);
  }, [currentTheme, themeStore.theme]);

  return <>{children}</>;
});

export default ThemeProvider;

