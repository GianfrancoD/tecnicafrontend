// Componente de tarjeta para mostrar productos

import React from 'react';
import { Product } from '../../types/product.types';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onView }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (date: Date | string): string => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagen del producto */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-4xl">📦</span>
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Header con nombre y precio */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-brand-primary ml-2">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Información adicional */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Categoría:</span>
            <span className="text-gray-700 font-medium">{product.category.name}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Stock:</span>
            <span className={`font-medium ${
              product.stock > 10 ? 'text-green-600' : 
              product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} unidades` : 'Sin stock'}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Actualizado:</span>
            <span className="text-gray-700">{formatDate(product.updatedAt)}</span>
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  +{product.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={() => onView && onView(product)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Ver
          </button>
          
          <button
            onClick={() => onEdit && onEdit(product)}
            className="flex-1 bg-brand-primary hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Editar
          </button>
          
          <button
            onClick={() => onDelete && onDelete(product)}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Badge de estado */}
      {product.stock === 0 && (
        <div className="absolute top-2 right-2">
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            Sin stock
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
