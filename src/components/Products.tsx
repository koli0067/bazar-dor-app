import PriceDecreasedSection from './PriceDecreasedSection';
import PriceIncreasedSection from './PriceIncreasedSection';

// API Product type definition
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
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
      next: { revalidate: 60 }, // ৬০ সেকেন্ডের ক্যাশিং লজিক
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

  // ডাটা না থাকলে নোটিফিকেশন ভিউ
  if (!products || products.length === 0) {
    return (
      <main className="bg-[#f2f5f0] min-h-screen flex items-center justify-center font-sans">
        <p className="text-gray-500 font-medium">বর্তমানে বাজারের কোনো ডাটা পাওয়া যায়নি।</p>
      </main>
    );
  }

  // ফিল্টার ডাটা
  const priceIncreased = products.filter((p) => p.change?.dir === 'up');
  const priceDecreased = products.filter((p) => p.change?.dir === 'down');

  return (
    <main className="bg-[#f2f5f0] min-h-screen py-10 px-4 font-sans">
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