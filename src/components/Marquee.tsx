import MarqueeClient from "./MarqueeClient";


const Marquee = async () => {
  // Server-side fetch
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
    next: { revalidate: 60 }, // ক্যাশিং এবং পারফরম্যান্সের জন্য
  });
  const products = await res.json();

  return (
    <div className="bg-gray-50 border-y border-gray-200 py-2.5 overflow-hidden">
      <MarqueeClient products={products} />
    </div>
  );
};

export default Marquee;