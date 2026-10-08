import Link from 'next/link';

interface IFoodtems{
    id: string,
    slug: string,
    nameBn: string,
    icon: string
}


const Navlink = async () => {
  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');
  const data:IFoodtems[] = await res.json();

  return (
    <div className='flex flex-wrap gap-4 md:gap-8 mt-10 justify-start items-center'>
      {data?.map((d) => (
        <Link key={d.id} href={`/category/${d.slug}`}>
          <div className='flex items-center gap-1.5 font-semibold hover:text-green-700 transition-colors'>
            <span>{d.icon}</span>
            <span>{d.nameBn}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navlink;