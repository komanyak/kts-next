import { serverProductsApi } from '@api/server';
import ProductsPageClient from '../../ProductsPageClient';

interface ProductsContentProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductsContent({ searchParams }: ProductsContentProps) {
  // Загружаем данные на сервере
  const initialProducts = await serverProductsApi.getProducts();
  
  return (
    <ProductsPageClient 
      initialProducts={initialProducts.data} 
      searchParams={searchParams} 
    />
  );
}

