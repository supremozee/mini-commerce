import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from '@/components/ui/ProductCard';
import { Product } from '@/types';

// Mock Zustand store
jest.mock('@/store/cartStore', () => ({
  useCartStore: () => ({
    addItem: jest.fn(),
  }),
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockProduct: Product = {
  id: '1',
  slug: 'test-product',
  name: 'Test Product',
  price: 99.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
  description: 'A test product description',
  category: 'Test Category',
  inStock: true,
  rating: 4.5,
  reviews: 100,
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
  });

  it('displays correct number of stars for rating', () => {
    render(<ProductCard product={mockProduct} />);
    
    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
  });

  it('shows Add to Cart button when product is in stock', () => {
    render(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add test product to cart/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).not.toBeDisabled();
  });

  it('disables Add to Cart button when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add test product to cart/i });
    expect(addButton).toBeDisabled();
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
});
