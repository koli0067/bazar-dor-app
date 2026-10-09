import { Product } from "@/app/types/product";
import ProductDetailView from "@/components/ProductDetailView";

// API থেকে সব প্রোডাক্ট এনে নির্দিষ্ট প্রোডাক্টটি খুঁজে বের করা
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f5f0]">
        <p className="text-gray-500 font-medium">পণ্যটি পাওয়া যায়নি।</p>
      </div>
    );
  }

  return <ProductDetailView product={product} />;
}