// Custom hook para manejar el estado de productos

import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilters, ProductFormData } from '../types/product.types';
import { productApi } from '../services/productApi';

export const useProducts = (initialFilters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {});

  // Cargar productos
  const loadProducts = useCallback(async (newFilters?: ProductFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const filtersToUse = newFilters || filters;
      const data = await productApi.getProducts(filtersToUse);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Crear producto
  const createProduct = useCallback(async (productData: ProductFormData): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newProduct = await productApi.createProduct(productData);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear producto');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar producto
  const updateProduct = useCallback(async (id: string, productData: Partial<ProductFormData>): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedProduct = await productApi.updateProduct(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar producto');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar producto
  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await productApi.deleteProduct(id);
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar producto');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros
  const applyFilters = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters);
    loadProducts(newFilters);
  }, [loadProducts]);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    const emptyFilters: ProductFilters = {};
    setFilters(emptyFilters);
    loadProducts(emptyFilters);
  }, [loadProducts]);

  // Buscar productos
  const searchProducts = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      await loadProducts();
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await productApi.searchProducts(searchTerm);
      setProducts(results);
      setFilters(prev => ({ ...prev, search: searchTerm }));
    } catch (err) {
      setError('Error al buscar productos');
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    filters,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    applyFilters,
    clearFilters,
    searchProducts,
    setError
  };
};
