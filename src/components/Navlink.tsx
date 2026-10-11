import CategoryItem from "./CategoryItem"


interface IFoodtems {
  id: string
  slug: string
  nameBn: string
  icon: string
}

const Navlink = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories')
  const data: IFoodtems[] = await res.json()

  return (
    <div className='flex flex-wrap gap-4 md:gap-8 mt-10 justify-start items-center'>
      {data?.map((d) => (
        <CategoryItem 
          key={d.id} 
          slug={d.slug} 
          nameBn={d.nameBn} 
          icon={d.icon} 
        />
      ))}
    </div>
  )
}

export default Navlink