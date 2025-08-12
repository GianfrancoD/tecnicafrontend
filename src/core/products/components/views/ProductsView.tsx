// Vista principal para gestionar productos

import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { productApi } from '../../services/productApi';
import { Product, ProductCategory } from '../../types/product.types';
import ProductCard from '../cards/ProductCard';
import NavigationHeader from '../../../dashboard/components/common/NavigationHeader';

interface ProductStats {
  total: number;
  inStock: number;
  outOfStock: number;
  categories: number;
}

const ProductsView: React.FC = () => {
  const {
    products,
    loading,
    error,
    filters,
    searchProducts,
    clearFilters,
    deleteProduct,
    setError
  } = useProducts();

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [stats, setStats] = useState<ProductStats | null>(null);

  // Cargar categorías y estadísticas
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, statsData] = await Promise.all([
          productApi.getCategories(),
          productApi.getProductStats()
        ]);
        setCategories(categoriesData);
        setStats(statsData);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, []);

  // Manejar búsqueda
  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    searchProducts(searchTerm);
  };

  // Manejar filtro por categoría
  const handleCategoryFilter = (categoryId: string): void => {
    setSelectedCategory(categoryId);
    // Aquí podrías aplicar filtros más complejos
  };

  // Manejar eliminación de producto
  const handleDeleteProduct = async (product: Product): Promise<void> => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
      const success = await deleteProduct(product.id);
      if (success) {
        // Actualizar estadísticas después de eliminar
        try {
          const newStats = await productApi.getProductStats();
          setStats(newStats);
        } catch (err) {
          console.error('Error updating stats:', err);
        }
      }
    }
  };

  // Limpiar filtros
  const handleClearFilters = (): void => {
    setSearchTerm('');
    setSelectedCategory('');
    clearFilters();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader 
        title="Gestión de Productos" 
        subtitle="Administra el catálogo de productos de la tienda"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600 text-sm">
              Gestiona todos los productos del catálogo desde esta sección
            </p>
          </div>
          <button
            className="bg-brand-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            onClick={() => alert('Crear nuevo producto (funcionalidad pendiente)')}
          >
            <span>➕</span>
            Nuevo Producto
          </button>
        </div>

        {/* Estadísticas */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">📦</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Productos</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">✅</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">En Stock</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.inStock}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold">❌</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Sin Stock</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.outOfStock}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold">🏷️</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Categorías</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.categories}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-brand-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                🔍
              </button>
            </form>

            {/* Filtro por categoría */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Botón limpiar filtros */}
            <button
              onClick={handleClearFilters}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              🗑️ Limpiar Filtros
            </button>
          </div>

          {/* Filtros activos */}
          {(filters.search || filters.category) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Filtros activos:</span>
                {filters.search && (
                  <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded-full">
                    Búsqueda: "{filters.search}"
                  </span>
                )}
                {filters.category && (
                  <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded-full">
                    Categoría: {categories.find(c => c.id === filters.category)?.name}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mensajes de error */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="font-medium">Error:</span>
              <span className="ml-2">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        )}

        {/* Lista de productos */}
        {!loading && (
          <div>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📭</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay productos
                </h3>
                <p className="text-gray-500">
                  {filters.search || filters.category 
                    ? 'No se encontraron productos con los filtros aplicados.'
                    : 'No hay productos en el catálogo.'
                  }
                </p>
                {(filters.search || filters.category) && (
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 bg-brand-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Productos ({products.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={(product) => alert(`Ver detalles de: ${product.name}`)}
                      onEdit={(product) => alert(`Editar: ${product.name}`)}
                      onDelete={handleDeleteProduct}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsView;
