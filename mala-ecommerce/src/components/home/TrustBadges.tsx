import { Award, Truck, CreditCard, RotateCcw } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Award,
    title: "30 Years Heritage",
    description: "Established 1994",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Across Pakistan",
  },
  {
    icon: CreditCard,
    title: "Cash on Delivery",
    description: "Pay when you receive",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-secondary/50 py-8">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 text-center md:text-left"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
