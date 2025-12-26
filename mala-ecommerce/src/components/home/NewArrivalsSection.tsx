"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function NewArrivalsSection() {
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  // Get the 4 newest products
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  const handleWishlistToggle = (product: typeof PRODUCTS[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addToCart(product, 1, product.colors[0], product.sizes.find(s => s.available)?.name || "M");
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <section className="bg-[#21301c] py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary">
            Fresh Drops
          </span>
          <h2 className="text-3xl font-black text-white md:text-5xl">
            New Arrivals
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <div key={product.id} className="group flex flex-col gap-4">
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#162013]">
                {/* New Badge */}
                {product.isNew && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-[#162013]">
                    New
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className={cn(
                    "absolute right-3 top-3 z-10 rounded-full p-2 transition-colors",
                    isInWishlist(product.id)
                      ? "bg-primary text-[#162013]"
                      : "bg-black/40 text-white hover:bg-primary hover:text-[#162013]"
                  )}
                >
                  <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
                </button>

                {/* Product Image */}
                <Link href={`/products/${product.slug}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  />
                </Link>

                {/* Add to Cart - Hover */}
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full rounded-xl bg-white py-3 text-sm font-bold text-black shadow-lg transition-colors hover:bg-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-start justify-between">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-bold text-white">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <p className="text-sm text-[#a2c398]">{product.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/collections/new-arrivals">
            <button className="inline-flex items-center gap-2 rounded-full border border-[#426039] bg-transparent px-8 py-3 text-sm font-bold text-white transition-colors hover:border-primary hover:bg-[#21301c]">
              View All New Arrivals
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
