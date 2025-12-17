"use client";

import { useState } from "react";
import Image from "next/image";
import { Rating } from "@/components/ui";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FEATURED_REVIEWS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? FEATURED_REVIEWS.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) =>
      prev === FEATURED_REVIEWS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Loved by 10,000+ Women
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <Rating rating={4.9} size="lg" showValue />
              <span className="text-muted-foreground">Average Rating</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURED_REVIEWS.map((review, index) => (
            <div
              key={review.id}
              className={cn(
                "rounded-lg border border-border bg-card p-6 transition-all duration-300",
                index === activeIndex && "ring-2 ring-primary md:ring-0"
              )}
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/30" />

              {/* Review Header */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {review.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    {review.customerName}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    {review.verified && (
                      <span className="text-primary">✓ Verified Buyer</span>
                    )}
                    <span className="text-muted-foreground">
                      • {review.customerLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-4">
                <Rating rating={review.rating} size="sm" />
              </div>

              {/* Content */}
              <p className="mt-4 text-muted-foreground line-clamp-4">
                &quot;{review.content}&quot;
              </p>

              {/* Review Image */}
              {review.images && review.images.length > 0 && (
                <div className="mt-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md">
                    <Image
                      src={review.images[0]}
                      alt="Customer review photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Dots - Mobile */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {FEATURED_REVIEWS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === activeIndex ? "w-6 bg-primary" : "bg-muted-foreground/30"
              )}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
