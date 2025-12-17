"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { ProductGrid } from "@/components/product";
import { Button } from "@/components/ui";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-md text-center">
          <Heart className="mx-auto h-20 w-20 text-muted-foreground" />
          <h1 className="mt-6 font-serif text-2xl font-bold">Your Wishlist is Empty</h1>
          <p className="mt-2 text-muted-foreground">
            Save your favorite items by clicking the heart icon on products you love.
          </p>
          <Link href="/collections">
            <Button className="mt-6" size="lg">
              Explore Collections
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold md:text-4xl">My Wishlist</h1>
            <p className="mt-2 text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <Button variant="outline" onClick={clearWishlist}>
            Clear All
          </Button>
        </div>

        <div className="mt-8">
          <ProductGrid products={items} columns={4} />
        </div>
      </div>
    </div>
  );
}
