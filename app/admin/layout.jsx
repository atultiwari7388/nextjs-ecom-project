'use client'
import SideBar from './components/Sidebar'

export default function Layout({ children }) {
  return (
    <main className='flex'>
      <SideBar />
      <section className='flex-1'>{children}</section>
    </main>
  )
}
