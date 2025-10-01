'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useNavigationStore } from '@stores/StoreContext';

export const useNavigation = (): void => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigationStore = useNavigationStore();

  useEffect(() => {
    navigationStore.updateLocation({
      pathname,
      search: searchParams.toString(),
      hash: '',
      state: null,
    });
  }, [pathname, searchParams, navigationStore]);
};
