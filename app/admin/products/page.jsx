import Link from 'next/link'

export default function Page() {
  return (
    <main className='p-5'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl'>Products</h1>
        <Link href={`/admin/products/form`}>
          <button className='bg-blue-500 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-full'>
            Add Product
          </button>
        </Link>
      </div>
    </main>
  )
}
