export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;

}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  navigating:boolean;
  setNavigating: (navigating:boolean)=>void;
}
