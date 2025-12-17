import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Award, Heart, Users, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | MALA - 30 Years of Pakistani Fashion Excellence",
  description: "Discover the story of MALA - a 30-year heritage of crafting exquisite Pakistani women's fashion. From Nowshera to the world.",
};

const VALUES = [
  {
    icon: Award,
    title: "Heritage & Craftsmanship",
    description: "Every piece tells a story of 30 years of expertise, passed down through generations of skilled artisans.",
  },
  {
    icon: Heart,
    title: "Passion for Quality",
    description: "We source only the finest fabrics and employ time-honored techniques to create pieces that last.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Our 10,000+ happy customers are at the heart of everything we do. Your satisfaction is our success.",
  },
  {
    icon: Sparkles,
    title: "Modern Elegance",
    description: "We blend traditional Pakistani aesthetics with contemporary design for the woman of today.",
  },
];

const MILESTONES = [
  { year: "1994", title: "The Beginning", description: "MALA was founded in Nowshera with a single store and a vision for quality." },
  { year: "2000", title: "Expansion", description: "Opened our second store and introduced bridal couture line." },
  { year: "2010", title: "Recognition", description: "Became one of the most trusted names in Pakistani fashion." },
  { year: "2020", title: "New Era", description: "Launched Insha Collection as our sister brand." },
  { year: "2024", title: "Digital Journey", description: "Bringing 30 years of excellence to your fingertips with our online store." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="MALA Atelier"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        <div className="container relative flex h-full items-center">
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Our Story
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              30 Years of Crafting{" "}
              <span className="text-primary">Elegance</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From a small boutique in Nowshera to becoming one of Pakistan&apos;s most trusted fashion houses, MALA has been dressing generations of women with timeless elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Our Heritage
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
                A Legacy of Excellence
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  In 1994, MALA was born from a simple dream: to bring the finest Pakistani fashion to women who appreciate quality, elegance, and the art of traditional craftsmanship.
                </p>
                <p>
                  What started as a small boutique in Nowshera has grown into a beloved brand, trusted by over 10,000 women across Pakistan. Our founder&apos;s vision of combining traditional techniques with modern sensibilities continues to guide every piece we create.
                </p>
                <p>
                  Today, MALA and our sister brand Insha Collection represent the pinnacle of Pakistani fashion – where heritage meets contemporary style, and every stitch tells a story of dedication and love.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <p className="font-serif text-4xl font-bold text-primary">30+</p>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Skilled Artisans</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="MALA Workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="container">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              What Drives Us
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Our Journey
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
              Milestones
            </h2>
          </div>
          <div className="relative mt-12">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border lg:block" />
            
            <div className="space-y-8 lg:space-y-12">
              {MILESTONES.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col lg:flex-row lg:items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                    <div className="rounded-lg border border-border bg-card p-6">
                      <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                      <h3 className="mt-2 font-serif text-lg font-semibold">{milestone.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative hidden h-4 w-4 flex-shrink-0 rounded-full bg-primary lg:block" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&q=80"
                alt="MALA Team"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                The People Behind MALA
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
                Crafted with Love
              </h2>
              <p className="mt-6 text-muted-foreground">
                Behind every MALA creation is a team of passionate individuals – from our skilled artisans who bring designs to life, to our designers who blend tradition with modern trends.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our team of 50+ craftspeople includes some of the finest embroiderers, tailors, and designers in Pakistan. Many have been with us for over two decades, their expertise refined over years of dedication to their craft.
              </p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-primary hover:underline">
                Join our team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="rounded-2xl bg-primary/10 p-8 text-center lg:p-16">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Experience the MALA Difference
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Join thousands of women who have discovered the perfect blend of tradition and elegance. Shop our collections and become part of the MALA family.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/collections">
                <Button size="lg">Shop Collections</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
