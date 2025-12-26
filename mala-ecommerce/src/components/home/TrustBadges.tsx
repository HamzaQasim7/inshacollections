import { Award, Truck, CreditCard, RotateCcw } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Award,
    title: "30 Years Heritage",
    description: "Trusted since 1994",
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
    <section className="border-y border-[#426039] bg-[#21301c]/50 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#21301c] text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-[#a2c398]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
