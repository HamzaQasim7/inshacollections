import Link from "next/link";
import Image from "next/image";
import { HERO_IMAGE } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Elegant Pakistani fashion model in dark green velvet dress posing in soft lighting"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient Overlay - matching HTML design */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#162013] via-[#162013]/50 to-transparent" />
      </div>

      {/* Content - Centered */}
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Est. Badge */}
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
          Est. 1994
        </span>

        {/* Heading */}
        <h1 className="mb-4 max-w-4xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
          Timeless Elegance,
          <br />
          <span className="text-primary">Modern Heritage</span>
        </h1>

        {/* Subheading */}
        <p className="mb-8 max-w-lg text-lg font-medium text-gray-200 md:text-xl">
          Celebrating 30 years of Pakistani luxury fashion. Handcrafted for the woman of today.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/collections">
            <button className="h-14 rounded-full bg-primary px-8 text-base font-bold text-[#162013] shadow-[0_0_20px_rgba(83,210,45,0.3)] transition-transform hover:scale-105 hover:bg-[#65e03f]">
              Shop Collection
            </button>
          </Link>
          <Link href="/about">
            <button className="h-14 rounded-full border border-white/20 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/10">
              View Lookbook
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
