import { Metadata } from 'next';
import { CartPage } from '@/components/cart/CartPage';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your selected items, update quantities, and proceed to checkout.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Cart() {
  return <CartPage />;
}
