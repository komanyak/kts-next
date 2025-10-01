import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { StoreProvider } from '@stores/StoreContext';
import '@styles/globals.scss';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lalasia - Furniture Store',
  description: 'Discover beautiful furniture and home decor at Lalasia. Quality products for your home.',
  keywords: 'furniture, home decor, chairs, tables, modern furniture',
  authors: [{ name: 'Lalasia Team' }],
  openGraph: {
    title: 'Lalasia - Furniture Store',
    description: 'Discover beautiful furniture and home decor at Lalasia.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
