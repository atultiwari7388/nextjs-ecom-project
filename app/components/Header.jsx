import Link from 'next/link'

export default function Header() {
  const menuList = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About us',
      link: '/about-us',
    },
    {
      name: 'Contact us',
      link: '/contact-us',
    },
  ]
  return (
    <nav className='py-4 px-14 border-b flex items-center justify-between'>
      {/* /** Logo Section */}
      <img className='h-20' src='/logo.png' alt='Company Logo' />
      {/* /** Menu Section */}
      <div className='flex gap-4 items-center font-semibold'>
        {menuList?.map((item) => {
          return (
            <Link href={item?.link}>
              <button>{item?.name}</button>
            </Link>
          )
        })}
      </div>
      <Link href='/login'>
        <button className='bg-blue-600 px-4 py-1 rounded-full text-white'>
          Login
        </button>
      </Link>
    </nav>
  )
}
