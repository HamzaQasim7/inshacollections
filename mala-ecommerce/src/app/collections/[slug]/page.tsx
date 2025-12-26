"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductGrid, ProductFilters } from "@/components/product";
import { Button } from "@/components/ui";
import { ChevronRight, Loader2 } from "lucide-react";
import { PRODUCTS, COLLECTIONS, CATEGORIES } from "@/lib/data";
import { FilterState, Product } from "@/types";

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  
  // Add collection slugs
  COLLECTIONS.forEach((collection) => {
    params.push({ slug: collection.slug });
  });
  
  // Add category slugs
  CATEGORIES.forEach((category) => {
    params.push({ slug: category.slug });
  });
  
  return params;
}

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    fabricTypes: [],
    sizes: [],
    colors: [],
    sortBy: "featured",
  });

  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Find collection or category info
  const collectionInfo = COLLECTIONS.find((c) => c.slug === slug);
  const categoryInfo = CATEGORIES.find((c) => c.slug === slug);
  const pageInfo = collectionInfo || categoryInfo;

  // Filter products based on slug and filters
  const filteredProducts = useMemo(() => {
    let result: Product[] = [];

    // Filter by collection/category
    if (slug === "new-arrivals") {
      result = PRODUCTS.filter((p) => p.isNew);
    } else if (slug === "sale") {
      result = PRODUCTS.filter((p) => p.isSale || p.originalPrice);
    } else {
      result = PRODUCTS.filter(
        (p) =>
          p.categorySlug === slug ||
          p.collection?.toLowerCase().includes(slug.replace(/-/g, " "))
      );
    }

    // If no products found for specific category, show all
    if (result.length === 0) {
      result = PRODUCTS;
    }

    // Apply price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply fabric filter
    if (filters.fabricTypes.length > 0) {
      result = result.filter((p) => filters.fabricTypes.includes(p.fabric));
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => s.available && filters.sizes.includes(s.name))
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "best-selling":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [slug, filters]);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  const pageTitle =
    slug === "new-arrivals"
      ? "New Arrivals"
      : slug === "sale"
      ? "Sale"
      : pageInfo?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] w-full overflow-hidden">
        <Image
          src={
            collectionInfo?.image ||
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC3j_QvoitUf83vneovI1Ik894vPMb-uSJUU53gTrUkeWEzKgsNYC52dFUd8FMwU-r_ycfWbn2yJOCGgR8kM7cgl3BHw8JV7LvSpydCEqfodd0axzpBLL5iuAxw__faHxdHKExiguBmnoxZrbbpCyRP-IQ-ZN1WR5N2WOgyiTDVCXQknybYpCdsJV3z28v9zZSv41VOFfnHd7MJ3XrNtHa-KP3BHGW6_uUWogUTpPzWoPc7d5PIpUbm02lh-axsIU0EUoKKDad4Ggg"
          }
          alt={pageTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        <div className="container relative flex h-full flex-col justify-center">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/collections" className="hover:text-primary">
              Collections
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{pageTitle}</span>
          </nav>

          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            The Festive Edit
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-2 max-w-lg text-muted-foreground">
            {pageInfo?.description ||
              "A curated collection of timeless silhouettes featuring intricate embroidery and luxurious fabrics."}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters - Desktop Sidebar */}
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              productCount={filteredProducts.length}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Sort Header */}
              <div className="mb-6 flex items-center justify-between lg:hidden">
                <span className="text-sm text-muted-foreground">
                  Showing {displayedProducts.length} of {filteredProducts.length} products
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-lg font-medium">No products found</p>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters to find what you&apos;re looking for.
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() =>
                      setFilters({
                        priceRange: [0, 100000],
                        fabricTypes: [],
                        sizes: [],
                        colors: [],
                        sortBy: "featured",
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <ProductGrid products={displayedProducts} columns={3} />

                  {/* Load More */}
                  <div className="mt-10 flex flex-col items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {displayedProducts.length} of {filteredProducts.length} products
                    </p>
                    {hasMore && (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={loadMore}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Load More Products"
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
