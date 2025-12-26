import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS, CATEGORIES } from "@/lib/data";

export const metadata = {
  title: "Collections | MALA - Premium Pakistani Fashion",
  description: "Explore MALA's exquisite collections of Pakistani women's clothing. From bridal couture to everyday elegance.",
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3j_QvoitUf83vneovI1Ik894vPMb-uSJUU53gTrUkeWEzKgsNYC52dFUd8FMwU-r_ycfWbn2yJOCGgR8kM7cgl3BHw8JV7LvSpydCEqfodd0axzpBLL5iuAxw__faHxdHKExiguBmnoxZrbbpCyRP-IQ-ZN1WR5N2WOgyiTDVCXQknybYpCdsJV3z28v9zZSv41VOFfnHd7MJ3XrNtHa-KP3BHGW6_uUWogUTpPzWoPc7d5PIpUbm02lh-axsIU0EUoKKDad4Ggg"
          alt="MALA Collections"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        <div className="container relative flex h-full items-center">
          <div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Our Collections
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Discover the finest Pakistani fashion, handcrafted with 30 years of expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            Featured Collections
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {COLLECTIONS.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-bold">{collection.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {collection.productCount} Products
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="bg-secondary/30 py-16">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            Shop by Category
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <div>
                  <h3 className="font-medium group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.productCount} items
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
