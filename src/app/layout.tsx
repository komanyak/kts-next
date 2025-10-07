import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { StoreProvider } from '@stores/StoreContext';
import ThemeProvider from '@components/ThemeProvider';
import '@styles/globals.scss';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lalasia - Online Store',
  description: 'Discover a wide range of products at Lalasia. From furniture and electronics to shoes and more - quality products for your lifestyle.',
  keywords: 'online store, furniture, electronics, shoes, home decor, appliances, shopping',
  authors: [{ name: 'Lalasia Team' }],
  openGraph: {
    title: 'Lalasia - Online Store',
    description: 'Discover a wide range of products at Lalasia. Quality products for your lifestyle.',
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
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
