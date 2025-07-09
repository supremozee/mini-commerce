import { Metadata } from 'next';
import { CheckoutPage } from '@/components/checkout/CheckoutPage';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order securely and quickly.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Checkout() {
  return <CheckoutPage />;
}
