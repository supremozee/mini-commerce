"use client";

import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, removeItem, items, setNavigating } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  useEffect(() => {
    setShowQuantityControls(currentQuantity > 0);
  }, [currentQuantity]);

  const handleLinkClick = () => {
    setNavigating(true);
    
    // Reset navigation state after a delay to allow for page transition
    setTimeout(() => {
      setNavigating(false);
    }, 1500);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    addItem(product);
    setShowQuantityControls(true);

    setTimeout(() => setLoading(false), 300);
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      removeItem(product.id);
      setShowQuantityControls(false);
    }
  };

  const handleRemoveItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(product.id);
    setShowQuantityControls(false);
  };
  return (
    <>
     <article className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">  
      <Link href={`/product/${product.slug}`} onClick={handleLinkClick} className="block">
        <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
            unoptimized
          />
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">
              ${product.price}
            </p>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </Link>

      <div className="absolute bottom-4 right-4">
        {!showQuantityControls ? (
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || loading}
            className="rounded-lg bg-blue-600 cursor-pointer px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            aria-label={`Add ${product.name} to cart`}
          >
            {loading ? (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </div>
            ) : (
              "Add to Cart"
            )}
          </button>
        ) : (
          <div className="flex items-center gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1 animate-in fade-in duration-300">
            <button
              onClick={handleDecreaseQuantity}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Decrease quantity"
            >
              {currentQuantity === 1 ? (
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              ) : (
                <span className="text-gray-600 font-medium">−</span>
              )}
            </button>

            <span className="min-w-[2rem] text-center text-sm font-medium text-gray-900 px-1">
              {currentQuantity}
            </span>

            <button
              onClick={handleIncreaseQuantity}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Increase quantity"
            >
              <span className="text-gray-600 font-medium">+</span>
            </button>

            <button
              onClick={handleRemoveItem}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ml-1 border-l border-gray-200"
              aria-label="Remove from cart"
            >
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </article>
    </>
  );
}
