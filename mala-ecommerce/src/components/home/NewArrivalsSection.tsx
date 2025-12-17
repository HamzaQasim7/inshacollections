import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product";
import { Button } from "@/components/ui";
import { PRODUCTS } from "@/lib/data";

export function NewArrivalsSection() {
  // Get the 4 newest products
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Fresh Drops
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
            New Arrivals
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Discover the latest additions to our collection. Fresh styles crafted with precision.
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid products={newArrivals} columns={4} />

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/collections/new-arrivals">
            <Button variant="outline" size="lg">
              View All New Arrivals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
