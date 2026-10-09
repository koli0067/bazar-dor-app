"use client";

import Link from "next/link";

// Market Interface
export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

// Product Interface
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
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: Market[];
}

interface Props {
  product: Product;
}

// English number ke Bangla digit e convert korar helper function
const toBn = (num: number | string): string => {
  const bnNums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnNums[parseInt(d)]);
};

export default function ProductDetailView({ product }: Props) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  // Agerkaler tulonay damer parthokko
  const priceDiff = Math.abs(product.today - product.yesterday);

  // Sob market er min ebong max dam
  const allMins = product.markets?.map((m) => m.min) || [];
  const allMaxs = product.markets?.map((m) => m.max) || [];

  const lowestPrice = allMins.length ? Math.min(...allMins) : product.today;
  const highestPrice = allMaxs.length ? Math.max(...allMaxs) : product.today;

  // Sorbonimno o sorbochho damer market khunja
  const lowestMarket =
    product.markets?.find((m) => m.min === lowestPrice)?.market || "বাজার";
  const highestMarket =
    product.markets?.find((m) => m.max === highestPrice)?.market || "বাজার";

  return (
    <div className="bg-[#f2f5f0] min-h-screen py-6 md:py-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[15px] text-gray-500 font-medium">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:underline"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-semibold">{product.nameBn}</span>
        </nav>

        {/* Main Card (Product Title & Today's Price) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 border border-gray-100">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit} -{" "}
                {product.categoryNameBn}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                গতকালকের তুলনায় আজ দাম{" "}
                <span
                  className={
                    isUp
                      ? "text-red-500 font-bold"
                      : isDown
                      ? "text-emerald-600 font-bold"
                      : "text-gray-600"
                  }
                >
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "একই রয়েছে"} -{" "}
                  {toBn(priceDiff)} টাকা
                </span>
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-xl text-right min-w-[140px] border border-emerald-100/50 self-end md:self-auto">
            <p className="text-[11px] text-gray-500 font-medium mb-1">
              আজকের দাম
            </p>
            <div className="text-2xl font-extrabold text-gray-900">
              {toBn(product.today)}
            </div>
            <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
              টাকা / কেজি
            </p>
            <div
              className={`text-[11px] font-bold mt-1 inline-flex items-center gap-1 ${
                isUp
                  ? "text-red-500"
                  : isDown
                  ? "text-emerald-600"
                  : "text-gray-500"
              }`}
            >
              <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
              <span>{toBn(Math.abs(product.change?.pct || 0))}%</span>
            </div>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm space-y-1">
           <h3 className="font-bold text=[25px] text-gray-800 py-4">
               দামের সারসংক্ষেপ
              </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Lowest Price */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm space-y-1">
              <p className="text-xs text-gray-400 font-medium">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold text-emerald-600">
                {toBn(lowestPrice)} টাকা
              </p>
              <p className="text-[11px] text-gray-400">{lowestMarket}</p>
            </div>

            {/* Highest Price */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm space-y-1">
              <p className="text-xs text-gray-400 font-medium">সর্বাধিক দাম</p>
              <p className="text-xl font-bold text-red-500">
                {toBn(highestPrice)} টাকা
              </p>
              <p className="text-[11px] text-gray-400">{highestMarket}</p>
            </div>

            {/* Average Price */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm space-y-1">
              <p className="text-xs text-gray-400 font-medium">গড় দাম</p>
              <p className="text-xl font-bold text-gray-800">
                {toBn(product.today)} টাকা
              </p>
              <p className="text-[11px] text-gray-400">প্রতি কেজি-এর হিসাবে</p>
            </div>

          </div>

        {/* Market Table */}
        <div>

            <h3 className="font-bold text=[25px] py-4 text-gray-800">
                বাজারভিত্তিক আজকের দাম
              </h3>
            <div className="bg-white p-6 rounded-2xl border border-gray-100/80 shadow-sm space-y-4">

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-[15px] text-gray-400 font-semibold">
                      <th className="py-3 px-2">বাজার</th>
                      <th className="py-3 px-2">বিভাগ</th>
                      <th className="py-3 px-2 text-center">সর্বনিম্ন</th>
                      <th className="py-3 px-2 text-center">সর্বাধিক</th>
                      <th className="py-3 px-2 text-right">গড়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 text-gray-700">
                    {product.markets?.map((item, index) => {
                      const avg = ((item.min + item.max) / 2).toFixed(2);
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-3 px-2 font-bold text-gray-800">
                            {item.market}
                          </td>
                          <td className="py-3 px-2 text-gray-500">
                            {item.division}
                          </td>
                          <td className="py-3 px-2 text-center font-medium">
                            {toBn(item.min)} টাকা
                          </td>
                          <td className="py-3 px-2 text-center font-medium">
                            {toBn(item.max)} টাকা
                          </td>
                          <td className="py-3 px-2 text-right font-bold text-gray-900">
                            {toBn(avg)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
        </div>

        </div>

      </div>
    </div>
  );
}