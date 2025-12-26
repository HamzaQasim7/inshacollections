import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CollectionsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Curated Collections
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore our finest selections for every occasion.
            </p>
          </div>
          <Link
            href="/collections"
            className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline md:flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {COLLECTIONS.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-xl bg-[#21301c] cursor-pointer",
                index === 1 && "md:mt-12" // Middle card offset like HTML design
              )}
            >
              {/* Image with zoom effect */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="mb-1 text-2xl font-bold text-white">
                  {collection.name}
                </h3>
                <p className="mb-4 text-sm text-gray-300 opacity-0 transition-all duration-300 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            View All Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
