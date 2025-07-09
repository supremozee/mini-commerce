'use client';

import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schema
const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  address: z.string().min(1, 'Address is required').min(5, 'Please enter a complete address'),
  city: z.string().min(1, 'City is required').min(2, 'City must be at least 2 characters'),
  zipCode: z.string().min(1, 'ZIP code is required').regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  cardNumber: z.string()
    .min(1, 'Card number is required')
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Please enter a valid card number'),
  expiryDate: z.string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter date in MM/YY format'),
  cvv: z.string()
    .min(1, 'CVV is required')
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Helper function to format card number
const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};

// Helper function to format expiry date
const formatExpiryDate = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) {
    return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
  }
  return v;
};

export function CheckoutPage() {
  const { items, getSubtotal, getTotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  const subtotal = getSubtotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = getTotal();

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form data:', data); // In real app, send to payment processor
      
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    } catch (error) {
      console.error('Order processing failed:', error);
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-8">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checkout.</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register('firstName')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register('lastName')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register('address')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main St"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register('city')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register('zipCode')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-xs text-red-600">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    {...register('cardNumber')}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      e.target.value = formatted;
                      register('cardNumber').onChange(e);
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-xs text-red-600">{errors.cardNumber.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      {...register('expiryDate')}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        e.target.value = formatted;
                        register('expiryDate').onChange(e);
                      }}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-xs text-red-600">{errors.expiryDate.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV *
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      {...register('cvv')}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123"
                      maxLength={4}
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-xs text-red-600">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
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
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !isValid}
                className="w-full mt-6 bg-blue-600 text-white cursor-pointer py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </div>
              
              <div className="mt-2 text-xs text-gray-400 text-center">
                * All fields are required
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
