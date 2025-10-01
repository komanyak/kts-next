import type { Product, ProductImage } from '@api/types';

export const getImageUrl = (
  images: ProductImage[],
  imageIndex = 0,
  preferredFormat: 'large' | 'medium' | 'small' | 'thumbnail' = 'large'
): string => {
  if (images.length > imageIndex) {
    const image = images[imageIndex];
    return image.formats[preferredFormat]?.url || image.url;
  }
  return '/images/product-main.jpg';
};

export const getProductImageUrl = (
  product: Product,
  preferredFormat: 'large' | 'medium' | 'small' | 'thumbnail' = 'medium'
): string => {
  return getImageUrl(product.images, 0, preferredFormat);
};

export const formatPrice = (price: number, discountPercent?: number): string => {
  if (discountPercent && discountPercent > 0) {
    const discountedPrice = price * (1 - discountPercent / 100);
    return `$${discountedPrice.toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
};
