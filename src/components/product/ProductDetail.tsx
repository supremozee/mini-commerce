'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover object-center"
            priority
            unoptimized
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 cursor-pointer">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-blue-600 text-white cursor-pointer px-8 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isAdded ? 'Added to Cart! ✓' : 'Add to Cart'}
            </button>
            <Link
              href="/cart"
              className="flex-1 border border-gray-300 cursor-pointer text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center"
            >
              View Cart
            </Link>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
            <dl className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Category:</dt>
                <dd className="text-gray-900">{product.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Rating:</dt>
                <dd className="text-gray-900">{product.rating}/5</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Reviews:</dt>
                <dd className="text-gray-900">{product.reviews}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
