import MarqueeClient from "./MarqueeClient";

const Marquee = async () => {
  
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products"); 
  const products = await res.json();

  return (
    <div className="bg-gray-50 border-y border-gray-200 py-2.5 overflow-hidden">
      <MarqueeClient products={products} />
    </div>
  );
};

export default Marquee;