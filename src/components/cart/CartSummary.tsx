'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export function CartSummary() {
  const { getSubtotal, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = getTotal();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%):</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span className="text-gray-900">
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        {subtotal > 100 && (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
            🎉 You qualify for free shipping!
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-gray-900">Total:</span>
            <span className="text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Link
        href="/checkout"
        className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        Proceed to Checkout
      </Link>
      
      <Link
        href="/"
        className="w-full mt-3 text-blue-600 text-center py-2 text-sm hover:text-blue-800 transition-colors block"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
