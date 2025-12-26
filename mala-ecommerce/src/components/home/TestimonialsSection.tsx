"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FEATURED_REVIEWS } from "@/lib/data";

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
    <section className="relative overflow-hidden py-20">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-white">
              Loved by 10,000+ Women
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="font-medium text-white">4.9/5 Average Rating</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#426039] transition-colors hover:border-primary hover:bg-primary hover:text-[#162013]"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#426039] transition-colors hover:border-primary hover:bg-primary hover:text-[#162013]"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURED_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-[#426039] bg-[#21301c]/50 p-6 transition-colors hover:border-primary/50"
            >
              {/* Customer Info */}
              <div className="mb-4 flex gap-4">
                {review.customerImage ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={review.customerImage}
                      alt={review.customerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-[#162013]">
                    {review.customerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-white">{review.customerName}</h4>
                  <p className="text-xs text-[#a2c398]">
                    Verified Buyer • {review.customerLocation}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              <p className="text-sm leading-relaxed text-gray-300">
                &quot;{review.content}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
