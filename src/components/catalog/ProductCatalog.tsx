"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ui/ProductCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

export function ProductCatalog() {
  const { data: products, isLoading, error } = useProducts();
  const { navigating, setNavigating } = useCartStore();

  // Reset navigation state when component mounts
  useEffect(() => {
    setNavigating(false);
  }, [setNavigating]);
  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorMessage message="Failed to load products. Please try again." />
    );
  if (!products || products.length === 0)
    return <ErrorMessage message="No products available." />;

  return (
    <>
      {navigating ? (
        <LoadingSpinner />
      ) : (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
