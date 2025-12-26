"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button, Input, Select } from "@/components/ui";
import {
  ChevronRight,
  ShieldCheck,
  Check,
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { PAKISTAN_CITIES, PAKISTAN_PROVINCES, SHIPPING_OPTIONS } from "@/lib/data";
import { PaymentMethod, ShippingMethod } from "@/types";

type CheckoutStep = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [saveAddress, setSaveAddress] = useState(true);

  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === shippingMethod)!;
  const shipping = selectedShipping.price;
  const total = subtotal + shipping;

  const steps: { id: CheckoutStep; label: string }[] = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ];

  const getStepIndex = (step: CheckoutStep) => steps.findIndex((s) => s.id === step);

  const handleContinueToPayment = () => {
    // Basic validation
    if (!email || !phone || !fullName || !address1 || !city || !province) {
      alert("Please fill in all required fields");
      return;
    }
    setCurrentStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinueToReview = () => {
    setCurrentStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success page
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Add some items to your cart before checkout.
        </p>
        <Link href="/collections">
          <Button className="mt-4">Browse Collections</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="border-b border-border bg-secondary/30">
        <div className="container py-6">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => {
              const isCurrent = step.id === currentStep;
              const isCompleted = getStepIndex(currentStep) > index;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                        isCurrent
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isCurrent ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="mx-4 h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold">Contact Information</h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="03XX-XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Already have an account?</span>
                  <Link href="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </div>

                <hr className="border-border" />

                <h2 className="font-serif text-2xl font-bold">Shipping Address</h2>

                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <Input
                  label="Address Line 1"
                  placeholder="Street address"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />

                <Input
                  label="Address Line 2 (Optional)"
                  placeholder="Apartment, suite, unit, etc."
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Select
                    label="City"
                    placeholder="Select city"
                    options={PAKISTAN_CITIES.map((c) => ({ value: c, label: c }))}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <Select
                    label="Province"
                    placeholder="Select province"
                    options={PAKISTAN_PROVINCES.map((p) => ({ value: p, label: p }))}
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Postal Code"
                    placeholder="XXXXX"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <Input
                    label="Country"
                    value="Pakistan"
                    disabled
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="saveAddress"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="h-4 w-4 rounded border-border"
                  />
                  <label htmlFor="saveAddress" className="text-sm">
                    Save this address for next time
                  </label>
                </div>

                <hr className="border-border" />

                <h2 className="font-serif text-2xl font-bold">Shipping Method</h2>

                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors",
                        shippingMethod === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={shippingMethod === option.id}
                          onChange={() => setShippingMethod(option.id)}
                          className="h-4 w-4 text-primary"
                        />
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        {option.price === 0 ? "Free" : formatPrice(option.price)}
                      </span>
                    </label>
                  ))}
                </div>

                <Button onClick={handleContinueToPayment} className="w-full" size="lg">
                  Continue to Payment
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep("shipping")}
                    className="text-sm text-primary hover:underline"
                  >
                    ← Back to Shipping
                  </button>
                </div>

                <h2 className="font-serif text-2xl font-bold">Payment Method</h2>

                <div className="space-y-3">
                  {/* COD - Primary */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="h-4 w-4 text-primary"
                    />
                    <Banknote className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Cash on Delivery (COD)</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when you receive your order
                      </p>
                    </div>
                    <span className="rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                      Recommended
                    </span>
                  </label>

                  {/* JazzCash */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
                      paymentMethod === "jazzcash"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="jazzcash"
                      checked={paymentMethod === "jazzcash"}
                      onChange={() => setPaymentMethod("jazzcash")}
                      className="h-4 w-4 text-primary"
                    />
                    <Smartphone className="h-6 w-6" />
                    <div>
                      <p className="font-medium">JazzCash</p>
                      <p className="text-sm text-muted-foreground">
                        Pay via JazzCash mobile wallet
                      </p>
                    </div>
                  </label>

                  {/* EasyPaisa */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
                      paymentMethod === "easypaisa"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="easypaisa"
                      checked={paymentMethod === "easypaisa"}
                      onChange={() => setPaymentMethod("easypaisa")}
                      className="h-4 w-4 text-primary"
                    />
                    <Smartphone className="h-6 w-6" />
                    <div>
                      <p className="font-medium">EasyPaisa</p>
                      <p className="text-sm text-muted-foreground">
                        Pay via EasyPaisa mobile wallet
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
                      paymentMethod === "bank"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="h-4 w-4 text-primary"
                    />
                    <Building2 className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">
                        Direct bank transfer
                      </p>
                    </div>
                  </label>

                  {/* Card Payment */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="h-4 w-4 text-primary"
                    />
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, UnionPay
                      </p>
                    </div>
                  </label>
                </div>

                <Button onClick={handleContinueToReview} className="w-full" size="lg">
                  Review Order
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Review Step */}
            {currentStep === "review" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep("payment")}
                    className="text-sm text-primary hover:underline"
                  >
                    ← Back to Payment
                  </button>
                </div>

                <h2 className="font-serif text-2xl font-bold">Review Your Order</h2>

                {/* Shipping Info */}
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Shipping Address</h3>
                    <button
                      onClick={() => setCurrentStep("shipping")}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>{fullName}</p>
                    <p>{address1}</p>
                    {address2 && <p>{address2}</p>}
                    <p>
                      {city}, {province} {postalCode}
                    </p>
                    <p>Pakistan</p>
                    <p className="mt-2">{phone}</p>
                    <p>{email}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Payment Method</h3>
                    <button
                      onClick={() => setCurrentStep("payment")}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {paymentMethod === "cod" && "Cash on Delivery"}
                    {paymentMethod === "jazzcash" && "JazzCash"}
                    {paymentMethod === "easypaisa" && "EasyPaisa"}
                    {paymentMethod === "bank" && "Bank Transfer"}
                    {paymentMethod === "card" && "Credit/Debit Card"}
                  </p>
                </div>

                {/* Items */}
                <div className="rounded-lg border border-border">
                  <div className="border-b border-border p-4">
                    <h3 className="font-medium">Order Items</h3>
                  </div>
                  <ul className="divide-y divide-border">
                    {items.map((item) => (
                      <li
                        key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                        className="flex items-center gap-4 p-4"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.selectedColor.name} / {item.selectedSize} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full"
                  size="lg"
                  isLoading={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By placing this order, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-bold">Order Summary</h2>

              {/* Items Preview */}
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="line-clamp-1 font-medium">{item.product.name}</p>
                      <p className="text-muted-foreground">
                        {item.selectedColor.name} / {item.selectedSize}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-border" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <hr className="border-border" />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{formatPrice(total)}</span>
                    <span className="ml-1 text-sm text-muted-foreground">PKR</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure checkout powered by SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
