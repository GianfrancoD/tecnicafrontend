// Tipos principales para el módulo de productos

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image?: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image?: File;
  stock: number;
  tags: string[];
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
  tags?: string[];
}

export interface ProductState {
  products: Product[];
  categories: ProductCategory[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export type ProductAction = 
  | { type: 'PRODUCTS_LOADING' }
  | { type: 'PRODUCTS_SUCCESS'; payload: Product[] }
  | { type: 'PRODUCTS_ERROR'; payload: string }
  | { type: 'PRODUCT_ADD'; payload: Product }
  | { type: 'PRODUCT_UPDATE'; payload: Product }
  | { type: 'PRODUCT_DELETE'; payload: string }
  | { type: 'SET_FILTERS'; payload: ProductFilters }
  | { type: 'SET_PAGINATION'; payload: Partial<ProductState['pagination']> };
