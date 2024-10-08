'use client'
import { useEffect, useState } from 'react'
import { Button, CircularProgress } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useProducts } from './../../../../lib/firestore/products/read'
import { deleteProductItem } from './../../../../lib/firestore/products/write'
import Tooltip from '@mui/material/Tooltip'

export default function ListView() {
  const [pageLimit, setPageLimit] = useState(10)
  const [lastSnapDocList, setLastSnapDocList] = useState([])

  useEffect(() => {
    setLastSnapDocList([])
  }, [pageLimit])

  const {
    data: products,
    error,
    isLoading,
    lastSnapDoc,
  } = useProducts({
    pageLimit: pageLimit,
    lastSnapDoc:
      lastSnapDocList?.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList?.length - 1],
  })

  const handleNextPage = () => {
    let newStack = [...lastSnapDocList]
    newStack.push(lastSnapDoc)
    setLastSnapDocList(newStack)
  }

  const handlePreviousPage = () => {
    let newStack = [...lastSnapDocList]
    newStack.pop()
    setLastSnapDocList(newStack)
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return <div className='text-red-500 text-center'>{error}</div>
  }

  return (
    <div className='flex-1 flex flex-col gap-5 p-5 rounded-xl bg-white shadow-lg'>
      <div className='flex justify-between items-center mb-4'></div>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                SR
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Image
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Title
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Stock
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Orders
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {products?.map((item, index) => (
              <Row
                index={index + lastSnapDocList?.length * pageLimit}
                item={item}
                key={item?.id}
              />
            ))}
          </tbody>
        </table>
        <div className='flex justify-between text-sm py-3'>
          <Button
            isDisabled={isLoading || lastSnapDocList?.length === 0}
            onClick={handlePreviousPage}
            size='sm'
            variant='bordered'
          >
            Previous
          </Button>
          <select
            value={pageLimit}
            onChange={(e) => setPageLimit(e.target.value)}
            className='px-5 rounded-xl'
            name='perpage'
            id='perpage'
          >
            <option value={3}>3 items</option>
            <option value={5}>5 items</option>
            <option value={10}>10 items</option>
            <option value={20}>20 items</option>
            <option value={100}>100 items</option>
          </select>

          <Button
            isDisabled={isLoading || products?.length === 0}
            onClick={handleNextPage}
            size='sm'
            variant='bordered'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the product "${item?.title}"?`
    )
    if (!confirmed) return

    setIsDeleting(true)
    try {
      await deleteProductItem({ id: item?.id })
      toast.success('Product successfully deleted!')
    } catch (error) {
      toast.error(error?.message || 'Failed to delete the product.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = () => {
    router.push(`/admin/products/form?id=${item?.id}`)
  }

  const stockStatus =
    item?.stock - (item?.orders ?? 0) > 0 ? 'Available' : 'Out of Stock'
  const statusColor =
    stockStatus === 'Available'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'

  return (
    <tr className='hover:bg-gray-50 transition-colors'>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
        {index + 1}
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <img
          src={item?.featureImageUrl || '/placeholder.jpg'}
          alt={item?.title}
          className='w-12 h-12 object-cover rounded-md shadow-sm'
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
        {item?.title}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
        {item?.price}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
        {item?.stock}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
        {item?.orders ?? 0}
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}
        >
          {stockStatus}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-center'>
        <div className='flex justify-center items-center space-x-4'>
          <Tooltip title='Edit Product' arrow>
            <button
              onClick={handleEdit}
              className='text-blue-500 hover:text-blue-700 transition-colors'
            >
              <FaEdit size={18} />
            </button>
          </Tooltip>
          <Tooltip title='Delete Product' arrow>
            <button
              onClick={handleDelete}
              className={`text-red-500 hover:text-red-700 transition-colors ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <svg
                  className='animate-spin h-5 w-5 text-red-500'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8v8H4z'
                  ></path>
                </svg>
              ) : (
                <FaTrash size={18} />
              )}
            </button>
          </Tooltip>
        </div>
      </td>
    </tr>
  )
}
