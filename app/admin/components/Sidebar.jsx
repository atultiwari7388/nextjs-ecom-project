'use client'

import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Star,
  Shapes,
  PackageOpen,
  ChartColumnStacked,
  Slack,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBar() {
  const menuList = [
    {
      name: 'Dashboard',
      link: '/admin',
      icon: <LayoutDashboard className='h-4 w-4' />,
    },
    {
      name: 'Products',
      link: '/admin/products',
      icon: <PackageOpen className='h-4 w-4' />,
    },
    {
      name: 'Categories',
      link: '/admin/categories',
      icon: <ChartColumnStacked className='h-4 w-4' />,
    },
    {
      name: 'Brands',
      link: '/admin/brands',
      icon: <Slack className='h-4 w-4' />,
    },
    {
      name: 'Orders',
      link: '/admin/orders',
      icon: <ShoppingCart className='h-4 w-4' />,
    },
    {
      name: 'Customer',
      link: '/admin/customer',
      icon: <Users className='h-4 w-4' />,
    },
    {
      name: 'Reviews',
      link: '/admin/reviews',
      icon: <Star className='h-4 w-4' />,
    },
    {
      name: 'Collection',
      link: '/admin/collection',
      icon: <Shapes className='h-4 w-4' />,
    },
  ]
  return (
    <section className='flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden md:w[290px]'>
      <div className='flex justify-center py-4'>
        <img className='h-20' src='/logo.png' alt='company-logo' />
      </div>
      <ul className='flex-1 h-full overflow-y-auto flex flex-col gap-4 round-xl'>
        {menuList?.map((item, key) => {
          return <Tab item={item} key={key} />
        })}
      </ul>
      <div className='flex justify-center'>
        <button className='flex gap-2 items-center px-3 py-1 hover:bg-indigo-100 rounded-xl w-full justify-center'>
          <LogOut className='h-4 w-4' />
          Logout
        </button>
      </div>
    </section>
  )
}

function Tab({ item }) {
  const pathname = usePathname()
  const isSelected = pathname === item?.link

  return (
    <Link href={item?.link}>
      <li
        className={`flex items-center gap-2 px-4 py-2 font-semibold ease-soft-spring transition-all duration-300 ${
          isSelected
            ? 'bg-[#879fff] text-white rounded-xl shadow-lg'
            : 'bg-white text-black rounded-xl hover:bg-gray-100'
        }`}
      >
        {item?.icon}
        {item?.name}
      </li>
    </Link>
  )
}
