'use client';

import { Product } from '@/app/types/product';
import Link from 'next/link';
import { useEffect, useState } from 'react';


// ইংরেজি সংখ্যা থেকে বাংলা সংখ্যায় কনভার্ট করার হেল্পার
const toBanglaNum = (num: number | undefined | null): string => {
  if (num === undefined || num === null) return '০';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)]);
};

// এককের নাম বাংলায় দেখানোর হেল্পার
const getUnitText = (unit: string): string => {
  if (unit === 'kg') return 'কেজি';
  if (unit === 'litre') return 'লিটার';
  if (unit === 'dozon' || unit === 'dozen') return 'ডজন';
  if (unit === 'piece') return 'পিস';
  return unit || 'কেজি';
};

// Twemoji CDN দিয়ে ইমেজ রেন্ডার করার হেল্পার
const renderProductImage = (item: Product) => {
  const emojiStr = item.image || item.categoryIcon || '🍚';

  if (emojiStr.startsWith('http') || emojiStr.startsWith('/')) {
    return (
      <img
        src={emojiStr}
        alt={item.nameBn}
        className="w-full h-full object-cover rounded-xl"
      />
    );
  }

  const codePoint = Array.from(emojiStr)
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join('-');

  const emojiImageUrl = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${codePoint}.png`;

  return (
    <img
      src={emojiImageUrl}
      alt={item.nameBn}
      className="w-8 h-8 object-contain"
      onError={(e) => {
        (e.currentTarget as HTMLElement).style.display = 'none';
      }}
    />
  );
};

export default function BazarProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://api.api-store.workers.dev/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Fetch Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-sans">লোড হচ্ছে...</div>;
  }

  return (
    <div className="bg-[#f2f5f0] min-h-screen py-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* হেডার সেকশন */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">সব পণ্য</h1>
          <p className="text-xs text-gray-500 mt-1">
            মোট {toBanglaNum(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* সব পণ্যের গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}

// সিঙ্গেল প্রডাক্ট কার্ড
function ProductCard({ item }: { item: Product }) {
  const dir = item.change?.dir || 'flat';
  const pct = Math.abs(item.change?.pct || 0);

  // দাম বাড়া/কমা/একই থাকার ডাইনামিক স্টাইল
  let badgeStyle = 'bg-gray-100 text-gray-500';
  let badgeSymbol = '—';

  if (dir === 'up') {
    badgeStyle = 'bg-red-50 text-red-500';
    badgeSymbol = '▲';
  } else if (dir === 'down') {
    badgeStyle = 'bg-emerald-50 text-emerald-600';
    badgeSymbol = '▼';
  }

  return (
    <Link
    href={`/products/${item.slug}`} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* কার্ড হেডার: আইকন ও নাম */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#f7f8f6] flex items-center justify-center shrink-0 overflow-hidden">
          {renderProductImage(item)}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-base leading-tight">{item.nameBn}</h3>
          <p className="text-xs text-gray-400 mt-0.5">প্রতি {getUnitText(item.unit)}</p>
        </div>
      </div>

      {/* কার্ড ফুটার: দাম ও চেঞ্জ পার্সেন্টেজ */}
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-[11px] text-gray-400 block mb-0.5">আজকের দাম</span>
          <div className="text-lg font-extrabold text-gray-900">
            {toBanglaNum(item.today)} <span className="text-xs font-normal text-gray-700">টাকা</span>
          </div>
        </div>

        {/* চেঞ্জ ব্যাজ */}
        <div className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${badgeStyle}`}>
          <span className="text-[10px]">{badgeSymbol}</span>
          <span>{toBanglaNum(pct)}%</span>
        </div>
      </div>
    </Link>
  );
}