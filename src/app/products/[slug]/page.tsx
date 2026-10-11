
import { Product } from "@/app/types/product";
import ProductDetailView from "@/components/ProductDetailView";
import { notFound } from "next/navigation";


async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const products: Product[] = await res.json();
    return products.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error("প্রোডাক্ট ডাটা আনতে সমস্যা হয়েছে:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound()
  }

  return <ProductDetailView product={product} />;
}