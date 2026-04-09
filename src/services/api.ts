// API Service for Blinds & Tales
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('admin_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<{
      token?: string;
      user?: { id: string; email: string; role: string };
      hash?: string;
      message?: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  logout() {
    this.clearToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Categories
  async getCategories() {
    return this.request<Category[]>('/categories');
  }

  async getCategory(slug: string) {
    return this.request<Category>(`/categories/${slug}`);
  }

  async createCategory(category: CreateCategoryRequest) {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  }

  async updateCategory(id: string, category: Partial<CreateCategoryRequest>) {
    return this.request<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    });
  }

  async deleteCategory(id: string) {
    return this.request<{ message: string }>(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Products
  async getProducts(params?: {
    category?: string;
    featured?: boolean;
    search?: string;
    in_stock?: boolean;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, String(value));
      });
    }
    const query = queryParams.toString();
    return this.request<ProductsResponse>(`/products${query ? `?${query}` : ''}`);
  }

  async getProduct(slug: string) {
    return this.request<ProductWithCategory>(`/products/${slug}`);
  }

  async getFeaturedProducts(limit = 6) {
    return this.request<ProductWithCategory[]>(`/products/featured/list?limit=${limit}`);
  }

  async createProduct(product: CreateProductRequest) {
    return this.request<ProductWithCategory>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: Partial<CreateProductRequest>) {
    return this.request<ProductWithCategory>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string) {
    return this.request<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Upload
  async uploadImage(base64Image: string, folder = 'products') {
    return this.request<{ url: string; path: string }>('/upload', {
      method: 'POST',
      body: JSON.stringify({ image: base64Image, folder }),
    });
  }

  async deleteImage(path: string) {
    return this.request<{ message: string }>('/upload', {
      method: 'DELETE',
      body: JSON.stringify({ path }),
    });
  }
}

export const api = new ApiService();

// Import types
import type { 
  Category, 
  Product, 
  ProductWithCategory, 
  ProductsResponse, 
  CreateCategoryRequest, 
  CreateProductRequest 
} from '@/types/api';
