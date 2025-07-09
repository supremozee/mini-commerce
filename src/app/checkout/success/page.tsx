import { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckoutSuccess } from '@/components/checkout/CheckoutSuccess';

export const metadata: Metadata = {
  title: 'Order Confirmation',
  description: 'Thank you for your order! Your purchase has been confirmed.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-8">⏳</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we load your order confirmation.</p>
        </div>
      </div>
    }>
      <CheckoutSuccess />
    </Suspense>
  );
}
