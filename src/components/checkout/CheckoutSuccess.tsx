'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'UNKNOWN';

  // Optional: Clear any navigation states when success page loads
  useEffect(() => {
    // Any cleanup logic can go here
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl mb-8">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h2>
          <p className="text-sm text-gray-600 mb-2">Order Number:</p>
          <p className="text-xl font-mono font-bold text-blue-600">#{orderId}</p>
          <p className="text-sm text-gray-500 mt-4">
            You will receive an email confirmation shortly.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="#"
            className="block w-full text-blue-600 py-2 text-sm hover:text-blue-800 transition-colors"
          >
            Track Your Order
          </Link>
        </div>
      </div>
    </div>
  );
}
