import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header, Footer, CartDrawer, WhatsAppButton } from "@/components/layout";

export const metadata: Metadata = {
  title: "MALA | Premium Pakistani Fashion - 30 Years of Elegance",
  description:
    "Discover MALA's exquisite collection of Pakistani women's clothing. Luxury bridal couture, elegant pret-a-porter, and premium unstitched fabrics. Free shipping across Pakistan. Cash on Delivery available.",
  keywords: [
    "Pakistani fashion",
    "women's clothing",
    "bridal wear",
    "luxury pret",
    "unstitched fabric",
    "MALA fashion",
    "Pakistani designer",
    "traditional wear",
  ],
  openGraph: {
    title: "MALA | Premium Pakistani Fashion",
    description: "Celebrating 30 years of Pakistani luxury fashion. Handcrafted for the woman of today.",
    url: "https://mala.pk",
    siteName: "MALA Fashion",
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "MALA | Premium Pakistani Fashion",
    description: "Celebrating 30 years of Pakistani luxury fashion.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <CartProvider>
          <WishlistProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppButton />
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
