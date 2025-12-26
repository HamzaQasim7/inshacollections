import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck
} from "lucide-react";
import { Button, Input } from "@/components/ui";

const FOOTER_LINKS = {
  shop: {
    title: "Shop",
    links: [
      { name: "New Arrivals", href: "/collections/new-arrivals" },
      { name: "Bridal Couture", href: "/collections/bridal-couture" },
      { name: "Luxury Pret", href: "/collections/luxury-pret" },
      { name: "Unstitched", href: "/collections/unstitched" },
      { name: "Sale", href: "/collections/sale" },
    ],
  },
  customerCare: {
    title: "Customer Care",
    links: [
      { name: "Track Order", href: "/track-order" },
      { name: "Shipping Policy", href: "/shipping-policy" },
      { name: "Returns & Exchange", href: "/returns" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/about#story" },
      { name: "Stores", href: "/stores" },
      { name: "Careers", href: "/careers" },
    ],
  },
};

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com/mala", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/mala", icon: Instagram },
  { name: "WhatsApp", href: "https://wa.me/923001234567", icon: MessageCircle },
  { name: "YouTube", href: "https://youtube.com/mala", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">MALA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Redefining Pakistani fashion with a blend of traditional craftsmanship and modern aesthetics. Established 1994.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-medium text-foreground">Stay in the Loop</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Subscribe for exclusive updates and get 10% off your first order.
              </p>
              <form className="mt-4 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-medium text-foreground">{FOOTER_LINKS.shop.title}</h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.shop.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground">{FOOTER_LINKS.customerCare.title}</h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.customerCare.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>+92 300 123 4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>hello@mala.pk</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>GT Road, Nowshera,<br />Khyber Pakhtunkhwa, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-border pt-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-5 w-5 text-primary" />
            <span>COD Available</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded bg-muted px-3 py-1 text-xs font-medium">VISA</span>
            <span className="rounded bg-muted px-3 py-1 text-xs font-medium">MC</span>
            <span className="rounded bg-muted px-3 py-1 text-xs font-medium">COD</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© 2024 MALA Fashion. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
