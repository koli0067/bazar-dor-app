import { Product } from "@/app/types/product";
import CategoryView from "@/components/CategoryView";

// API থেকে ক্যাটাগরির ডেটা ফেচ করার ফাংশন
async function getCategoryProducts(categorySlug: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${categorySlug}`,
      { next: { revalidate: 60 } } // প্রতি ৬০ সেকেন্ডে নতুন ডেটা চেক করবে
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("API ডাটা আনতে সমস্যা হয়েছে:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug;

  const products = await getCategoryProducts(categorySlug);

  return <CategoryView products={products} />;
}