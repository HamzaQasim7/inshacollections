import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden lg:min-h-[90vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1920&q=80"
          alt="MALA Hero - Elegant Pakistani Fashion"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative flex h-full min-h-[80vh] items-center lg:min-h-[90vh]">
        <div className="max-w-2xl py-20">
          {/* Badge */}
          <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
            New Collection
          </span>

          {/* Heading */}
          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
            Timeless Elegance,{" "}
            <span className="text-primary">Modern Heritage</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-lg text-lg text-muted-foreground md:text-xl">
            Celebrating 30 years of Pakistani luxury fashion. Handcrafted for the woman of today.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/collections">
              <Button size="lg" className="px-8">
                Shop Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="px-8">
                View Lookbook
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>7-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/50 p-1">
          <div className="h-2 w-1 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
