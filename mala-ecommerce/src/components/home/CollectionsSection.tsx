import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/data";

export function CollectionsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Curated Collections
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              Explore Our Finest
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Explore our finest selections for every occasion.
            </p>
          </div>
          <Link
            href="/collections"
            className="hidden items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover md:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg"
            >
              {/* Image */}
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  {collection.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {collection.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            View All Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
