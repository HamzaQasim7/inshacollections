import { COLLECTIONS, CATEGORIES } from "@/lib/data";

export async function generateStaticParams() {
  const collections = COLLECTIONS.map(c => ({ slug: c.slug }));
  const categories = CATEGORIES.map(c => ({ slug: c.slug }));
  const specialPages = [{ slug: "new-arrivals" }, { slug: "sale" }];
  
  return [...collections, ...categories, ...specialPages];
}
