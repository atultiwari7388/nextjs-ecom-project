'use client'

import SideBar from './Sidebar'
import Header from './Headers'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    setIsOpen(false) // Close the sidebar when the route changes
  }, [pathname])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <main className='relative flex'>
      {/* Sidebar for larger screens */}
      <div className='hidden md:block'>
        <SideBar />
      </div>

      {/* Sidebar for mobile screens */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72 md:hidden`}
        role='navigation'
        aria-hidden={!isOpen}
        id='sidebar'
      >
        <SideBar />
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40 md:hidden'
          onClick={toggleSidebar}
          aria-hidden='true'
        ></div>
      )}

      {/* Main content */}
      <section className='flex-1 flex flex-col min-h-screen'>
        <Header toggleSidebar={toggleSidebar} />
        <section className='flex-1 bg-[#eff3f4] p-4'>{children}</section>
      </section>
    </main>
  )
}
