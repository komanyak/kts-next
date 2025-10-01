import qs from 'qs';
import type { ProductsResponse, ProductResponse } from './types';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';
const JWT_TOKEN =
  'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef';

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


export const serverProductsApi = {
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

    // Используем Next.js fetch без кеширования для динамических данных
    const response = await fetch(`${BASE_URL}/products?${query}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Отключаем кеширование для динамических данных
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

    // Используем Next.js fetch с кешированием
    const response = await fetch(`${BASE_URL}/products/${documentId}?${query}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 600 }, // Кешируем на 10 минут
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },
};
