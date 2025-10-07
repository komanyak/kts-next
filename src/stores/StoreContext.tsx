'use client';

import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { RootStore } from './RootStore';
import { rootStore } from './RootStore';

const StoreContext = createContext<RootStore | null>(null);

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

export const useStores = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStores must be used within a StoreProvider');
  }
  return store;
};

export const useAuthStore = () => {
  const { authStore } = useStores();
  return authStore;
};

export const useProductsStore = () => {
  const { productsStore } = useStores();
  return productsStore;
};

export const useProductStore = () => {
  const { productStore } = useStores();
  return productStore;
};

export const useCartStore = () => {
  const { cartStore } = useStores();
  return cartStore;
};

export const useNavigationStore = () => {
  const { navigationStore } = useStores();
  return navigationStore;
};

export const useThemeStore = () => {
  const { themeStore } = useStores();
  return themeStore;
};
