'use client'

import { Menu } from 'lucide-react'

export default function Header({ toggleSidebar }) {
  return (
    <header className='flex items-center justify-between bg-white border-b px-4 py-4'>
      {/* Toggle Button */}
      <div className='flex items-center md:hidden'>
        <button
          onClick={toggleSidebar}
          className='p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          aria-label='Toggle Sidebar'
          aria-expanded='false' // You can dynamically set this based on `isOpen`
          aria-controls='sidebar'
        >
          <Menu className='h-6 w-6' />
        </button>
      </div>

      {/* Page Title */}
      <h1 className='text-xl font-semibold'>Dashboard</h1>
    </header>
  )
}
