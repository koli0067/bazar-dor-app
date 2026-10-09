'use client';

import Link from 'next/link';
import { Product } from './Products';


interface Props {
  items: Product[];
}

// ইংরেজি সংখ্যা বাংলা করার হেল্পার
const toBanglaNum = (num: number | undefined | null): string => {
  if (num === undefined || num === null) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)]);
};

// এককের নাম বাংলায় দেখানোর হেল্পার
const getUnitText = (unit: string): string => {
  if (unit === 'kg') return 'কেজি';
  if (unit === 'litre') return 'লিটার';
  if (unit === 'dozon' || unit === 'dozen') return 'ডজন';
  return unit || 'কেজি';
};

export default function PriceDecreasedSection({ items = [] }: Props) {
  if (!items.length) return null;

  return (
    <div>
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
        <span className="text-emerald-600 text-sm">▼</span> আজ দাম কমেছে
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.slice(0, 6).map((item) => {
          const pct = Math.abs(item.change?.pct || 0);

          return (
            <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer block"
              >
              {/* উপরের অংশ: আইকন ও নাম */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f7f8f6] flex items-center justify-center text-2xl shrink-0">
                  <span>{item.image || item.categoryIcon || '🍚'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base leading-tight">{item.nameBn}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">প্রতি {getUnitText(item.unit)}</p>
                </div>
              </div>

              {/* নিচের অংশ: দাম ও সবুজ ব্যাজ */}
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">আজকের দাম</span>
                  <div className="text-lg font-extrabold text-gray-900">
                    {toBanglaNum(item.today)} <span className="text-xs font-normal text-gray-700">টাকা</span>
                  </div>
                </div>

                <div className="px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 bg-emerald-50 text-emerald-600">
                  <span className="text-[10px]">▼</span>
                  <span>{toBanglaNum(pct)}%</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}