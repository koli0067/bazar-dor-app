import PriceDecreasedSection from './PriceDecreasedSection';
import PriceIncreasedSection from './PriceIncreasedSection';

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) throw new Error('ডাটা লোড করতে সমস্যা হয়েছে');
    
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error('বাজারের ডাটা আনতে সমস্যা হয়েছে:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  if (!products || products.length === 0) {
    return (
      <main className="bg-[#f2f5f0] min-h-screen flex items-center justify-center font-sans">
        <p className="text-gray-500 font-medium">বর্তমানে বাজারের কোনো ডাটা পাওয়া যায়নি।</p>
      </main>
    );
  }

  // Top 6 Risers (সবচেয়ে বেশি দাম বাড়া পণ্য)
  const priceIncreased = products
    .filter((p) => p.change?.dir === 'up')
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0));

  // Top 6 Fallers (সবচেয়ে বেশি দাম কমা পণ্য)
  const priceDecreased = products
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0));

  return (
    <main className="bg-[#f2f5f0] py-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* আজ দাম বেড়েছে সেকশন */}
        {priceIncreased.length > 0 && (
          <PriceIncreasedSection items={priceIncreased} />
        )}

        {/* আজ দাম কমেছে সেকশন */}
        {priceDecreased.length > 0 && (
          <PriceDecreasedSection items={priceDecreased} />
        )}
      </div>
    </main>
  );
}