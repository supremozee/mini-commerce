'use client';

import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex-shrink-0">
        <Link href={`/product/${item.product.slug}`}>
          <Image
            src={item.product.image}
            alt={item.product.name}
            width={120}
            height={120}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </Link>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              <Link href={`/product/${item.product.slug}`} className="hover:text-blue-600">
                {item.product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
            <p className="text-lg font-semibold text-gray-900 mt-2">${item.product.price}</p>
          </div>
          
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 p-2 cursor-pointer"
            aria-label={`Remove ${item.product.name} from cart`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-700">
              Qty:
            </label>
            <select
              id={`quantity-${item.id}`}
              value={item.quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="cursor-pointer rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-lg font-semibold text-gray-900">
            ${itemTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
