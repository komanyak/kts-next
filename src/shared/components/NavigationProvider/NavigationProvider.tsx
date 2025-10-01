'use client';

import { useNavigation } from '@hooks/useNavigation';

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  useNavigation();
  
  return <>{children}</>;
};
