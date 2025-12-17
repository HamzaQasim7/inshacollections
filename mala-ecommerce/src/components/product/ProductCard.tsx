"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Badge, Button } from "@/components/ui";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, setCartOpen } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const hasMultipleImages = product.images.length > 1;
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add with first available size and color
    const availableSize = product.sizes.find((s) => s.available)?.name || product.sizes[0].name;
    const defaultColor = product.colors[0];
    
    addItem(product, 1, defaultColor, availableSize);
    setCartOpen(true);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <article
      className={cn("group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          {/* Main Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              hasMultipleImages && isHovered && "opacity-0"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover Image */}
          {hasMultipleImages && (
            <Image
              src={product.images[1]}
              alt={`${product.name} - alternate view`}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isSale && <Badge variant="sale">Sale</Badge>}
            {product.isTrending && <Badge variant="trending">Trending</Badge>}
            {discount > 0 && (
              <Badge variant="sale">Save {discount}%</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110",
              inWishlist ? "text-destructive" : "text-foreground"
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn("h-5 w-5", inWishlist && "fill-current")}
            />
          </button>

          {/* Quick Actions */}
          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 pointer-events-none"
            )}
          >
            <Button
              onClick={handleQuickAdd}
              className="flex-1"
              size="sm"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Link
              href={`/products/${product.slug}`}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>

          {/* Low Stock Warning */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute bottom-3 left-3 right-3">
              <span className="rounded bg-destructive/90 px-2 py-1 text-xs font-medium text-destructive-foreground">
                Only {product.stock} left!
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <p className="text-xs text-muted-foreground">{product.category}</p>
          <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex gap-1 pt-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
