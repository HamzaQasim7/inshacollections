export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  collection?: string;
  fabric: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  features?: string[];
  modelInfo?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  name: string;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerImage?: string;
  customerLocation: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  images?: string[];
  helpful: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
}

export interface FilterState {
  priceRange: [number, number];
  fabricTypes: string[];
  sizes: string[];
  colors: string[];
  sortBy: SortOption;
}

export type SortOption = 
  | "featured"
  | "price-low-high"
  | "price-high-low"
  | "newest"
  | "best-selling";

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export type PaymentMethod = "cod" | "jazzcash" | "easypaisa" | "bank" | "card";

export type ShippingMethod = "standard" | "express" | "same-day";

export interface ShippingOption {
  id: ShippingMethod;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}
