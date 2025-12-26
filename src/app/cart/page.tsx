"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button, QuantitySelector, Input } from "@/components/ui";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Tag,
  ChevronDown,
  Truck,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/data";

const FREE_SHIPPING_THRESHOLD = 5000;

const SUGGESTED_PRODUCTS = PRODUCTS.slice(0, 2);

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const shipping = hasFreeShipping ? 0 : 200;
  const tax = 0; // No tax in Pakistan for most items
  const total = subtotal + shipping - promoDiscount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "mala10") {
      setPromoDiscount(subtotal * 0.1);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoDiscount(0);
    }
  };

  // Calculate estimated delivery
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 3);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 5);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (items.length === 0) {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-md text-center">
          <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground" />
          <h1 className="mt-6 font-serif text-2xl font-bold">Your Cart is Empty</h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/collections">
            <Button className="mt-6" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">Your Shopping Bag</h1>
        <p className="mt-2 text-muted-foreground">{items.length} items in your cart</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Free Shipping Progress */}
            <div className="mb-6 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {hasFreeShipping
                        ? "🎉 You've got free shipping!"
                        : "Free Shipping"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {hasFreeShipping
                        ? "100%"
                        : `${Math.round(freeShippingProgress)}%`}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                  {!hasFreeShipping && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      You&apos;re{" "}
                      <span className="font-semibold text-foreground">
                        {formatPrice(amountToFreeShipping)}
                      </span>{" "}
                      away from free shipping!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Cart Items Table */}
            <div className="rounded-lg border border-border bg-card">
              {/* Header */}
              <div className="hidden border-b border-border px-6 py-4 md:grid md:grid-cols-12">
                <span className="col-span-6 text-sm font-medium text-muted-foreground">
                  Product
                </span>
                <span className="col-span-3 text-center text-sm font-medium text-muted-foreground">
                  Quantity
                </span>
                <span className="col-span-3 text-right text-sm font-medium text-muted-foreground">
                  Total
                </span>
              </div>

              {/* Items */}
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                    className="p-4 md:grid md:grid-cols-12 md:items-center md:gap-4 md:px-6"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-4">
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-medium hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Variant: {item.selectedColor.name} / {item.selectedSize}
                        </p>
                        <span className="mt-1 text-sm font-medium text-primary md:hidden">
                          {formatPrice(item.product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 mt-4 flex items-center justify-between md:mt-0 md:justify-center">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(qty) =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize,
                            qty
                          )
                        }
                        max={item.product.stock}
                      />
                      <button
                        onClick={() =>
                          removeItem(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize
                          )
                        }
                        className="ml-4 rounded p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive md:hidden"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="col-span-3 hidden items-center justify-end gap-4 md:flex">
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() =>
                          removeItem(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize
                          )
                        }
                        className="rounded p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promo Code */}
            <div className="mt-6 rounded-lg border border-border bg-card">
              <button
                onClick={() => setIsPromoOpen(!isPromoOpen)}
                className="flex w-full items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-primary" />
                  <span className="font-medium">Have a promo code?</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isPromoOpen && "rotate-180"
                  )}
                />
              </button>
              {isPromoOpen && (
                <div className="border-t border-border p-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      error={promoError}
                      className="flex-1"
                    />
                    <Button onClick={handleApplyPromo} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {promoDiscount > 0 && (
                    <p className="mt-2 text-sm text-success">
                      Promo code applied! You save {formatPrice(promoDiscount)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Continue Shopping */}
            <Link
              href="/collections"
              className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>

            {/* Complete Your Look */}
            <div className="mt-12">
              <h2 className="font-serif text-xl font-bold">Complete Your Look</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {SUGGESTED_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-sm text-primary">{formatPrice(product.price)}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-primary">
                      + Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Shipping
                    {hasFreeShipping && (
                      <span className="ml-2 text-xs text-success">(FREE)</span>
                    )}
                  </span>
                  <span className={hasFreeShipping ? "text-success" : ""}>
                    {hasFreeShipping ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex items-center justify-between text-success">
                    <span>Promo Discount</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{formatPrice(total)}</span>
                      <span className="ml-1 text-sm text-muted-foreground">PKR</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="mt-6 block">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Secure Checkout</span>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="rounded bg-muted px-2 py-1 text-xs font-medium">VISA</span>
                <span className="rounded bg-muted px-2 py-1 text-xs font-medium">MC</span>
                <span className="rounded bg-muted px-2 py-1 text-xs font-medium">COD</span>
              </div>

              {/* Estimated Delivery */}
              <div className="mt-6 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-medium">
                    {formatDate(deliveryStart)} - {formatDate(deliveryEnd)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
