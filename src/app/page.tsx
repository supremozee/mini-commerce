import { ProductCatalog } from '@/components/catalog/ProductCatalog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mini-Commerce',
  description: 'Browse our extensive catalog of quality products including electronics, fashion, home goods and more at unbeatable prices.',
  openGraph: {
    title: 'Mini-Commerce - Quality Products at Great Prices',
    type: 'website',
    description: 'Browse our extensive catalog of quality products including electronics, fashion, home goods and more at unbeatable prices.',
  },
  robots: {
    index:true,
    follow:true,
    googleBot: {
      index:true
    }
  }
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Mini-Commerce
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Discover different amazing products at a discounted prices
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <span className="bg-white/20 px-4 py-2 rounded-full">✓ Free Shipping over $100</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">✓ 30-Day Returns</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">✓ Secure Checkout</span>
        </div>
      </section>
      
      <ProductCatalog />
    </div>
  );
}
