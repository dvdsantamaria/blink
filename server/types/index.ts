export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  price: number;
  compare_price?: number;
  category_id: string;
  images: string[];
  featured: boolean;
  in_stock: boolean;
  sku?: string;
  tags?: string[];
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}
