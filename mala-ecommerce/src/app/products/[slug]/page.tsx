"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button, Badge, Rating, QuantitySelector } from "@/components/ui";
import { ProductGrid } from "@/components/product";
import {
  Heart,
  ShoppingBag,
  ChevronRight,
  Truck,
  CreditCard,
  RotateCcw,
  ChevronDown,
  Share2,
  Check,
} from "lucide-react";
import { PRODUCTS, REVIEWS } from "@/lib/data";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { ProductColor } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "size" | "delivery">(
    "description"
  );
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { addItem, setCartOpen } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  // Initialize selected color
  useState(() => {
    if (product && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  });

  const productReviews = useMemo(
    () => REVIEWS.filter((r) => r.productId === product?.id),
    [product?.id]
  );

  const relatedProducts = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => p.id !== product?.id && p.categorySlug === product?.categorySlug
      ).slice(0, 4),
    [product?.id, product?.categorySlug]
  );

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/collections">
          <Button className="mt-4">Browse Collections</Button>
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (!selectedSize) {
      const availableSize = product.sizes.find((s) => s.available);
      if (availableSize) {
        setSelectedSize(availableSize.name);
      }
    }

    const color = selectedColor || product.colors[0];
    const size = selectedSize || product.sizes.find((s) => s.available)?.name || "";

    addItem(product, quantity, color, size);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/collections/${product.categorySlug}`} className="hover:text-primary">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Gallery */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="hidden flex-col gap-3 md:flex">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative h-20 w-16 overflow-hidden rounded-md border-2 transition-all",
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {product.isNew && <Badge variant="new">New</Badge>}
                  {discount > 0 && <Badge variant="sale">Save {discount}%</Badge>}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Title & Rating */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold md:text-3xl">
                    {product.name}
                  </h1>
                  <div className="mt-2 flex items-center gap-3">
                    <Rating
                      rating={product.rating}
                      showValue
                      reviewCount={product.reviewCount}
                    />
                    {product.reviewCount > 0 && (
                      <span className="text-sm text-primary">• Verified Product</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleItem(product)}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    inWishlist
                      ? "bg-destructive/10 text-destructive"
                      : "hover:bg-muted"
                  )}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={cn("h-6 w-6", inWishlist && "fill-current")} />
                </button>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="sale">Save {discount}%</Badge>
                  </>
                )}
              </div>

              {/* Color Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Color: {selectedColor?.name || product.colors[0].name}
                  </span>
                </div>
                <div className="mt-3 flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "relative h-10 w-10 rounded-full border-2 transition-all",
                        (selectedColor?.name || product.colors[0].name) === color.name
                          ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "border-border hover:border-primary"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Size: {selectedSize || "Select"}</span>
                  <button className="text-sm text-primary hover:underline">
                    📐 Size Guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => size.available && setSelectedSize(size.name)}
                      disabled={!size.available}
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-md border text-sm font-medium transition-all",
                        selectedSize === size.name
                          ? "border-primary bg-primary text-primary-foreground"
                          : size.available
                          ? "border-border hover:border-primary"
                          : "cursor-not-allowed border-border bg-muted text-muted-foreground line-through opacity-50"
                      )}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
                {product.modelInfo && (
                  <p className="mt-2 text-sm text-muted-foreground">{product.modelInfo}</p>
                )}
              </div>

              {/* Stock Status */}
              {product.stock <= 5 && product.stock > 0 && (
                <p className="mt-4 text-sm font-medium text-destructive">
                  🔥 Only {product.stock} left in stock!
                </p>
              )}

              {/* Quantity & Add to Cart */}
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  max={product.stock}
                />
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              {/* Buy Now */}
              <Button
                onClick={handleBuyNow}
                variant="outline"
                className="mt-3 w-full"
                size="lg"
              >
                Buy Now
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border border-border p-4">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                  <span className="text-xs">On orders {'>'} 5k</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Cash On Delivery</span>
                  <span className="text-xs">Available</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Easy Returns</span>
                  <span className="text-xs">7-day policy</span>
                </div>
              </div>

              {/* Product Details Accordion */}
              <div className="mt-6 divide-y divide-border rounded-lg border border-border">
                {/* Description */}
                <div>
                  <button
                    onClick={() =>
                      setActiveTab(activeTab === "description" ? "description" : "description")
                    }
                    className="flex w-full items-center justify-between p-4"
                  >
                    <span className="font-medium">Description</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        activeTab === "description" && "rotate-180"
                      )}
                    />
                  </button>
                  {activeTab === "description" && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground">{product.description}</p>
                      {product.features && (
                        <ul className="mt-4 space-y-2">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Size Chart */}
                <div>
                  <button
                    onClick={() => setActiveTab(activeTab === "size" ? "description" : "size")}
                    className="flex w-full items-center justify-between p-4"
                  >
                    <span className="font-medium">Size Chart</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        activeTab === "size" && "rotate-180"
                      )}
                    />
                  </button>
                  {activeTab === "size" && (
                    <div className="px-4 pb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="py-2 text-left">Size</th>
                            <th className="py-2 text-left">Bust</th>
                            <th className="py-2 text-left">Waist</th>
                            <th className="py-2 text-left">Hip</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr><td className="py-2">XS</td><td>32&quot;</td><td>26&quot;</td><td>35&quot;</td></tr>
                          <tr><td className="py-2">S</td><td>34&quot;</td><td>28&quot;</td><td>37&quot;</td></tr>
                          <tr><td className="py-2">M</td><td>36&quot;</td><td>30&quot;</td><td>39&quot;</td></tr>
                          <tr><td className="py-2">L</td><td>38&quot;</td><td>32&quot;</td><td>41&quot;</td></tr>
                          <tr><td className="py-2">XL</td><td>40&quot;</td><td>34&quot;</td><td>43&quot;</td></tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Delivery & Returns */}
                <div>
                  <button
                    onClick={() =>
                      setActiveTab(activeTab === "delivery" ? "description" : "delivery")
                    }
                    className="flex w-full items-center justify-between p-4"
                  >
                    <span className="font-medium">Delivery & Returns</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        activeTab === "delivery" && "rotate-180"
                      )}
                    />
                  </button>
                  {activeTab === "delivery" && (
                    <div className="space-y-3 px-4 pb-4 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Standard Delivery:</strong> 3-5
                        business days across Pakistan
                      </p>
                      <p>
                        <strong className="text-foreground">Express Delivery:</strong> 1-2
                        business days (Additional Rs. 200)
                      </p>
                      <p>
                        <strong className="text-foreground">Returns:</strong> 7-day hassle-free
                        returns. Items must be unworn with tags attached.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Share */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Share:</span>
                <button className="rounded-full p-2 hover:bg-muted">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="border-t border-border py-12 lg:py-16">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Customer Reviews</h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Rating Summary */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="text-center">
                <span className="text-5xl font-bold">{product.rating}</span>
                <Rating rating={product.rating} className="mt-2 justify-center" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on {product.reviewCount} reviews
                </p>
              </div>

              {/* Rating Breakdown */}
              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-3 text-sm">{star}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : star === 2 ? 1 : 1}%`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right text-sm text-muted-foreground">
                      {star === 5 ? "85%" : star === 4 ? "10%" : star === 3 ? "3%" : star === 2 ? "1%" : "1%"}
                    </span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-6 w-full">
                Write a Review
              </Button>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2">
              {/* Filter Buttons */}
              <div className="mb-6 flex flex-wrap gap-2">
                {["Most Recent", "With Photos", "Verified Purchase", "Highest Rating"].map(
                  (filter) => (
                    <button
                      key={filter}
                      className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>

              {/* Reviews */}
              <div className="space-y-6">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-lg border border-border bg-card p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                            {review.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h4 className="font-medium">{review.customerName}</h4>
                            <div className="flex items-center gap-2 text-sm">
                              {review.verified && (
                                <span className="text-primary">✓ Verified Buyer</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>

                      <Rating rating={review.rating} className="mt-3" />

                      <h5 className="mt-3 font-medium">{review.title}</h5>
                      <p className="mt-2 text-muted-foreground">{review.content}</p>

                      {review.images && review.images.length > 0 && (
                        <div className="mt-4 flex gap-2">
                          {review.images.map((img, idx) => (
                            <div
                              key={idx}
                              className="relative h-16 w-16 overflow-hidden rounded-md"
                            >
                              <Image src={img} alt="Review photo" fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-primary">
                          👍 Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-12 lg:py-16">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">Complete The Look</h2>
            <div className="mt-8">
              <ProductGrid products={relatedProducts} columns={4} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
