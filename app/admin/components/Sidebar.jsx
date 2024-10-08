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
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import { signOut } from 'firebase/auth'
import { auth } from './../../../lib/firebase'

export default function SideBar() {
  const menuList = [
    {
      name: 'Dashboard',
      link: '/admin',
      icon: <LayoutDashboard className='h-5 w-5' />,
    },
    {
      name: 'Products',
      link: '/admin/products',
      icon: <PackageOpen className='h-5 w-5' />,
    },
    {
      name: 'Categories',
      link: '/admin/categories',
      icon: <ChartColumnStacked className='h-5 w-5' />,
    },
    {
      name: 'Brands',
      link: '/admin/brands',
      icon: <Slack className='h-5 w-5' />,
    },
    {
      name: 'Orders',
      link: '/admin/orders',
      icon: <ShoppingCart className='h-5 w-5' />,
    },
    {
      name: 'Customer',
      link: '/admin/customer',
      icon: <Users className='h-5 w-5' />,
    },
    {
      name: 'Reviews',
      link: '/admin/reviews',
      icon: <Star className='h-5 w-5' />,
    },
    {
      name: 'Collection',
      link: '/admin/collection',
      icon: <Shapes className='h-5 w-5' />,
    },
    {
      name: 'Admins',
      link: '/admin/admins',
      icon: <ShieldCheck className='h-5 w-5' />,
    },
  ]

  return (
    <aside className='sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-full overflow-hidden w-[290px] z-[1000]'>
      {/* Logo */}
      <div className='flex justify-center py-4'>
        <img className='h-20' src='/logo.png' alt='Company Logo' />
      </div>

      {/* Menu List */}
      <ul className='flex-1 h-full overflow-y-auto flex flex-col gap-4 rounded-xl'>
        {menuList.map((item, index) => (
          <Tab item={item} key={index} />
        ))}
      </ul>

      {/* Logout Button */}
      <div className='flex justify-center'>
        <button
          onClick={async () => {
            try {
              // Clear any existing toasts
              toast.dismiss()

              // Show a loading toast before signing out
              // toast.loading('Signing out...')

              await signOut(auth)

              // Show success message
              toast.success('Logged out successfully')
            } catch (error) {
              toast.error(error?.message)
            }
          }}
          className='flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center transition-colors duration-200'
        >
          <LogOut className='h-5 w-5' />
          Logout
        </button>
      </div>
    </aside>
  )
}

function Tab({ item }) {
  const pathname = usePathname()
  const isSelected = pathname === item.link

  return (
    <Link href={item.link}>
      <li
        role='menuitem'
        className={`flex items-center gap-3 px-4 py-2 font-semibold rounded-xl transition-all duration-300 ${
          isSelected
            ? 'bg-indigo-500 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {item.icon}
        {item.name}
      </li>
    </Link>
  )
}
