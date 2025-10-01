import qs from 'qs';

import type { ProductsResponse, ProductResponse } from './types';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://front-school-strapi.ktsdev.ru/api';
const JWT_TOKEN = process.env.NEXT_PUBLIC_API_JWT_TOKEN;

if (!JWT_TOKEN) {
  console.error('NEXT_PUBLIC_API_JWT_TOKEN is not defined in environment variables');
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


export const productsApi = {
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
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
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

      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return response.json();
  },
};
