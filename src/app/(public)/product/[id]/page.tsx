import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import { serverProductsApi } from '@api/server';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const response = await serverProductsApi.getProduct(id);
    const product = response.data;
    
    return {
      title: `${product.title} - Lalasia`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.images.map(img => img.url),
      },
    };
  } catch {
    return {
      title: 'Product - Lalasia',
      description: 'Product details',
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  try {
    const [productResponse, relatedResponse] = await Promise.all([
      serverProductsApi.getProduct(id),
      serverProductsApi.getProducts(),
    ]);
    
    const relatedProducts = relatedResponse.data.slice(0, 3);
    
    return <ProductPageClient product={productResponse.data} relatedProducts={relatedProducts} />;
  } catch {
    notFound();
  }
}
