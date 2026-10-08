"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  yesterday: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default function MarqueeClient({ products }: { products: Product[] }) {
  return (
    <MarqueeText duration={20} direction="right" pauseOnHover={true}>
      <div className="flex items-center gap-8 pr-8">
        {products?.map((item) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";

          return (
            <div
              key={item.id}
              className="flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <span>{item.categoryIcon || "🍚"}</span>
              <span className="font-medium text-gray-800">
                {item.nameBn} {item.today} টাকা/
                {item.unit === "kg" ? "কেজি" : "লিটার"}
              </span>

              {isUp && (
                <span className="flex items-center gap-0.5 text-red-600 font-bold">
                  ▲ {Math.abs(item.change?.pct || 0)}%
                </span>
              )}

              {isDown && (
                <span className="flex items-center gap-0.5 text-green-600 font-bold">
                  ▼ {Math.abs(item.change?.pct || 0)}%
                </span>
              )}

              {!isUp && !isDown && (
                <span className="text-gray-500 font-bold">➖ 0%</span>
              )}
            </div>
          );
        })}
      </div>
    </MarqueeText>
  );
}