"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/app/types/product";

interface Props {
  products: Product[];
}

export default function CategoryView({ products }: Props) {
  const [sortOption, setSortOption] = useState<string>("default");

  // দামের ওপর ভিত্তি করে পণ্য সর্টিং লজিক (বাংলা ও ইংরেজি উভয় সংখ্যার জন্য নিরাপদ)
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const list = [...products];

    // দামকে সব ধরনের ফরম্যাট থেকে আসল সংখ্যায় (Number) পরিণত করার হেলপার
    const getNumericPrice = (p: Product) => {
      if (typeof p.today === "number") return p.today;

      // বাংলা সংখ্যাকে ইংরেজি সংখ্যায় রূপান্তর (যেমন: "১৪৮" -> 148)
      const bnToEn: { [key: string]: string } = {
        "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
        "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
      };
      const cleanStr = String(p.today ?? 0).replace(/[০-৯]/g, (w) => bnToEn[w] || w);
      return parseFloat(cleanStr) || 0;
    };

    // দাম: কম থেকে বেশি (Ascending)
    if (sortOption === "low-high") {
      return list.sort((a, b) => getNumericPrice(a) - getNumericPrice(b));
    }

    // দাম: বেশি থেকে কম (Descending)
    if (sortOption === "high-low") {
      return list.sort((a, b) => getNumericPrice(b) - getNumericPrice(a));
    }

    return list; // ডিফল্ট অর্ডার
  }, [products, sortOption]);

  // পণ্য না থাকলে খালি পেজ প্রদর্শনের ব্যবস্থা
  if (!products || products.length === 0) {
    return (
      <div className="bg-[#f2f5f0] min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center max-w-md w-full space-y-4">
          <div className="text-5xl">🔍</div>
          <h2 className="text-xl font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-xs text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নেই অথবা লিংকটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = products[0]?.categoryNameBn || "ক্যাটাগরি";
  const categoryIcon = products[0]?.categoryIcon || "🍚";

  return (
    <div className="bg-[#f2f5f0] min-h-screen py-6 px-4 md:py-8">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* ব্যানার সংক্রান্ত তথ্য */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100/80 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* সোর্ট ফিল্টার */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100/80 flex justify-end items-center shadow-sm">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="text-xs font-medium">সাজান:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer text-gray-700 font-medium"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-high">দাম: কম থেকে বেশি</option>
              <option value="high-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* মোট সংখ্যা */}
        <p className="text-xs text-gray-500 px-1 pt-1 font-medium">
          মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* প্রোডাক্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {sortedProducts.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";

            return (
              <div
                key={product.id}
                className="bg-white p-5 rounded-2xl border border-gray-100/80 shadow-sm flex flex-col justify-between h-40"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    {product.image}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {product.nameBn}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      প্রতি {product.unit}
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">
                      আজকের দাম
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-gray-900">
                        {product.today}
                      </span>
                      <span className="text-xs font-semibold text-gray-800">
                        টাকা
                      </span>
                    </div>
                  </div>

                  <div
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      isUp
                        ? "bg-red-50 text-red-500"
                        : isDown
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                    <span>{Math.abs(product.change?.pct || 0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}