
import BazarProductsList from "@/components/BazarProductsList";
import ProductsPage from "@/components/Products";
import Image from "next/image";

export default function Home() {
   const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
  })
  return (
    <div className="max-w-7xl m-auto mt-10">
      <div className="flex flex-wrap justify-between px-5 py-5 bg-white">
        <div>
          <span className="bg-green-100 p-2 rounded-2xl">{date}</span> 
          <h2 className="text-3xl font-bold mt-5 mb-5">আজকের বাজারের দাম এক নজরে</h2>
          <p className="mb-5">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, 
            সর্বনিম্ন <br />-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            <button className="btn border bg-green-700 text-white px-4 py-1.5 rounded-[5px]">সব পণ্য দেখুন</button>
        </div>
        <div>
          <Image 
          src={'/bazar-hero.png'}
          width={300}
          height={300}
          alt="Image">

          </Image>
        </div>
      </div>
      <ProductsPage></ProductsPage>
      <BazarProductsList></BazarProductsList>
    </div>
  );
}
