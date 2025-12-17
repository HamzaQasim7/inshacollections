"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button, QuantitySelector } from "@/components/ui";
import { X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 5000;

export function CartDrawer() {
  const { 
    isOpen, 
    setCartOpen, 
    items, 
    removeItem, 
    updateQuantity, 
    totalItems, 
    subtotal 
  } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="font-serif text-xl font-semibold">Your Cart</h2>
            <span className="text-muted-foreground">({totalItems} items)</span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="rounded-full p-2 transition-colors hover:bg-muted"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-success">🎉 You&apos;ve got free shipping!</span>
                ) : (
                  <>
                    You&apos;re <span className="font-semibold text-primary">{formatPrice(amountToFreeShipping)}</span> away from free shipping!
                  </>
                )}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="font-serif text-lg font-medium">Your cart is empty</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Looks like you haven&apos;t added anything yet
              </p>
              <Button
                className="mt-6"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                  className="flex gap-4 rounded-lg border border-border bg-card p-4"
                >
                  {/* Product Image */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {item.product.name}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.selectedColor.name} / {item.selectedSize}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize
                          )
                        }
                        className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
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
                        className="scale-90 origin-left"
                      />
                      <span className="font-medium text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Subtotal</span>
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Shipping calculated at checkout
            </p>

            <div className="mt-4 space-y-3">
              <Link href="/checkout" onClick={() => setCartOpen(false)}>
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/cart" onClick={() => setCartOpen(false)}>
                <Button variant="outline" className="w-full" size="lg">
                  View Cart
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              🔒 100% Secure Checkout • Cash on Delivery Available
            </p>
          </div>
        )}
      </div>
    </>
  );
}
