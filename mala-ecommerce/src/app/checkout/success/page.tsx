import Link from "next/link";
import { Button } from "@/components/ui";
import { CheckCircle2, Package, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Order Confirmed | MALA",
  description: "Your order has been placed successfully.",
};

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `MALA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <div className="mx-auto max-w-lg text-center">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>

          {/* Success Message */}
          <h1 className="mt-6 font-serif text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for shopping with MALA. Your order has been placed successfully.
          </p>

          {/* Order Number */}
          <div className="mt-6 rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="mt-1 text-xl font-bold text-primary">{orderNumber}</p>
          </div>

          {/* What's Next */}
          <div className="mt-8 space-y-4 text-left">
            <h2 className="font-medium">What happens next?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ve sent a confirmation email with your order details.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                <Package className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Your order will be processed within 24 hours and shipped within 3-5 business days.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Need Help?</p>
                  <p className="text-sm text-muted-foreground">
                    Contact us at +92 300 123 4567 or WhatsApp for any queries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button size="lg">Continue Shopping</Button>
            </Link>
            <Link href="/track-order">
              <Button variant="outline" size="lg">
                Track Order
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-sm text-muted-foreground">
            Join 10,000+ happy customers who love shopping with MALA
          </p>
        </div>
      </div>
    </div>
  );
}
