// API Service para productos con datos mock para prueba técnica

import { Product, ProductCategory, ProductFilters, ProductFormData } from '../types/product.types';

// Datos de prueba para la demostración
const MOCK_CATEGORIES: ProductCategory[] = [
  { id: '1', name: 'Tecnología', description: 'Productos tecnológicos' },
  { id: '2', name: 'Ropa', description: 'Vestimenta y accesorios' },
  { id: '3', name: 'Hogar', description: 'Artículos para el hogar' },
  { id: '4', name: 'Deportes', description: 'Equipamiento deportivo' },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Laptop Gaming Pro',
    description: 'Laptop de alto rendimiento para gaming y trabajo profesional',
    price: 1299.99,
    category: MOCK_CATEGORIES[0],
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300',
    stock: 15,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    tags: ['gaming', 'laptop', 'alta-gama']
  },
  {
    id: '2', 
    name: 'Smartphone Ultra',
    description: 'Teléfono inteligente con cámara profesional y 5G',
    price: 899.99,
    category: MOCK_CATEGORIES[0],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    stock: 32,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    tags: ['smartphone', '5g', 'camara']
  },
  {
    id: '3',
    name: 'Camiseta Premium',
    description: 'Camiseta de algodón orgánico con diseño moderno',
    price: 29.99,
    category: MOCK_CATEGORIES[1],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
    stock: 50,
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
    tags: ['camiseta', 'algodon', 'casual']
  },
  {
    id: '4',
    name: 'Silla Ergonómica',
    description: 'Silla de oficina ergonómica con soporte lumbar',
    price: 199.99,
    category: MOCK_CATEGORIES[2],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
    stock: 8,
    isActive: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16'),
    tags: ['silla', 'ergonomica', 'oficina']
  },
  {
    id: '5',
    name: 'Zapatillas Running',
    description: 'Zapatillas deportivas para running con tecnología de amortiguación',
    price: 119.99,
    category: MOCK_CATEGORIES[3],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    stock: 25,
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-14'),
    tags: ['zapatillas', 'running', 'deportes']
  }
];

// Simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ProductApiService {
  private products: Product[] = [...MOCK_PRODUCTS];
  private categories: ProductCategory[] = [...MOCK_CATEGORIES];

  // Obtener todos los productos con filtros opcionales
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    await delay(500); // Simular latencia de red
    
    let filteredProducts = [...this.products];

    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category.id === filters.category);
      }
      
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.tags.some(tag => tag.toLowerCase().includes(search))
        );
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => filters.inStock ? p.stock > 0 : p.stock === 0);
      }
      
      if (filters.tags && filters.tags.length > 0) {
        filteredProducts = filteredProducts.filter(p =>
          filters.tags!.some(tag => p.tags.includes(tag))
        );
      }
    }

    return filteredProducts.filter(p => p.isActive);
  }

  // Obtener un producto por ID
  async getProductById(id: string): Promise<Product | null> {
    await delay(300);
    return this.products.find(p => p.id === id) || null;
  }

  // Crear nuevo producto
  async createProduct(productData: ProductFormData): Promise<Product> {
    await delay(800);
    
    const category = this.categories.find(c => c.id === productData.categoryId);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category,
      image: productData.image ? URL.createObjectURL(productData.image) : undefined,
      stock: productData.stock,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: productData.tags
    };

    this.products.push(newProduct);
    return newProduct;
  }

  // Actualizar producto
  async updateProduct(id: string, productData: Partial<ProductFormData>): Promise<Product> {
    await delay(600);
    
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    const currentProduct = this.products[productIndex];
    const category = productData.categoryId 
      ? this.categories.find(c => c.id === productData.categoryId)
      : currentProduct.category;

    if (productData.categoryId && !category) {
      throw new Error('Categoría no encontrada');
    }

    const updatedProduct: Product = {
      ...currentProduct,
      ...productData,
      category: category!,
      image: productData.image ? URL.createObjectURL(productData.image) : currentProduct.image,
      updatedAt: new Date()
    };

    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  // Eliminar producto (soft delete)
  async deleteProduct(id: string): Promise<boolean> {
    await delay(400);
    
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products[productIndex].isActive = false;
    this.products[productIndex].updatedAt = new Date();
    return true;
  }

  // Obtener categorías
  async getCategories(): Promise<ProductCategory[]> {
    await delay(200);
    return [...this.categories];
  }

  // Estadísticas rápidas
  async getProductStats(): Promise<{
    total: number;
    inStock: number;
    outOfStock: number;
    categories: number;
  }> {
    await delay(300);
    
    const activeProducts = this.products.filter(p => p.isActive);
    
    return {
      total: activeProducts.length,
      inStock: activeProducts.filter(p => p.stock > 0).length,
      outOfStock: activeProducts.filter(p => p.stock === 0).length,
      categories: this.categories.length
    };
  }
}

// Exportar instancia singleton
export const productApi = new ProductApiService();
