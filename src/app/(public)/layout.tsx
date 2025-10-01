import { Suspense } from 'react';
import Header from '@components/Header';
import { NavigationProvider } from '@components/NavigationProvider';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </Suspense>
    </>
  );
}
