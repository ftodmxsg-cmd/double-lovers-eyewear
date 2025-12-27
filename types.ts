
export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  availableForSale: boolean;
  sku?: string;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  price: number;
  category: 'Optical' | 'Sunglasses' | 'Collab';
  images: string[];
  description: string;
  colors: string[];
  variants: ProductVariant[];
  availableForSale: boolean;
}

export interface StylistRecommendation {
  reasoning: string;
  suggestedShapes: string[];
  suggestedColors: string[];
}

export interface CartItem {
  variantId: string;
  quantity: number;
  product: Product;
}
