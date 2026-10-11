'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CategoryItemProps {
  slug: string
  nameBn: string
  icon: string
}

const CategoryItem = ({ slug, nameBn, icon }: CategoryItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === `/category/${slug}`

  return (
    <Link href={`/category/${slug}`}>
      <div
        className={`flex items-center gap-1.5 font-semibold transition-colors px-3 py-1.5 rounded-lg ${
          isActive
            ? 'bg-green-700 text-white'
            : 'text-gray-800 hover:text-green-700'
        }`}
      >
        <span>{icon}</span>
        <span>{nameBn}</span>
      </div>
    </Link>
  )
}

export default CategoryItem