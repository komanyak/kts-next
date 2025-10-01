import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Lalasia - Online Store',
  description: 'Shop furniture, electronics, shoes, and more at Lalasia. Quality products for every need.',
};

export default function HomePage() {
  redirect('/products');
}
