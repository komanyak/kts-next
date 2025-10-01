import qs from 'qs';
import type { ProductsResponse, ProductResponse } from './types';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://front-school-strapi.ktsdev.ru/api';
const JWT_TOKEN = process.env.API_JWT_TOKEN;

if (!JWT_TOKEN) {
  throw new Error('API_JWT_TOKEN is not defined in environment variables');
}

type QueryParams = {
  populate: string[];
  filters?: {
    title?: {
      $containsi: string;
    };
    productCategory?: {
      documentId: {
        $eq?: string;
        $in?: string[];
      };
    };
  };
};


export type CategoryOption = {
  documentId: string;
  title: string;
};

export const serverProductsApi = {

  async getAllCategories(): Promise<CategoryOption[]> {
    const response = await fetch(`${BASE_URL}/products?populate=productCategory`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { 
        revalidate: 3600, 
        tags: ['categories'] 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data: ProductsResponse = await response.json();
    
 
    const categories = data.data
      .map((product) => product.productCategory)
      .filter((category): category is NonNullable<typeof category> => category != null)
      .reduce(
        (acc, category) => {
          if (!acc.find((cat) => cat.documentId === category.documentId)) {
            acc.push({
              documentId: category.documentId,
              title: category.title,
            });
          }
          return acc;
        },
        [] as CategoryOption[]
      );

    return categories;
  },

  
  async getProducts(searchQuery?: string, categoryIds?: string[]): Promise<ProductsResponse> {
    const queryParams: QueryParams = {
      populate: ['images', 'productCategory'],
    };

    if ((searchQuery && searchQuery.trim()) || (categoryIds && categoryIds.length > 0)) {
      queryParams.filters = {};

      if (searchQuery && searchQuery.trim()) {
        queryParams.filters.title = {
          $containsi: searchQuery.trim(),
        };
      }

      if (categoryIds && categoryIds.length > 0) {
        if (categoryIds.length === 1) {
          queryParams.filters.productCategory = {
            documentId: {
              $eq: categoryIds[0],
            },
          };
        } else {
          queryParams.filters.productCategory = {
            documentId: {
              $in: categoryIds,
            },
          };
        }
      }
    }

    const query = qs.stringify(queryParams, {
      arrayFormat: 'brackets',
    });


    const response = await fetch(`${BASE_URL}/products?${query}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', 
      next: { tags: ['products'] } 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },

 
  async getProduct(documentId: string): Promise<ProductResponse> {
    const query = qs.stringify({
      populate: ['images', 'productCategory'],
    });

    const response = await fetch(`${BASE_URL}/products/${documentId}?${query}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { 
        revalidate: 600, 
        tags: ['products', `product-${documentId}`] 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },
};
