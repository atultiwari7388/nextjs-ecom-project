'use client'
import { useState } from 'react'
import { CircularProgress } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useAdmins } from './../../../../lib/firestore/admins/read'
import { deleteAdmin } from '../../../../lib/firestore/admins/write'

export default function ListView() {
  const { data: admins, error, isLoading } = useAdmins()

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
      <h1 className='text-2xl font-semibold mb-4 text-center'>Admins</h1>
      <table className='min-w-full border border-gray-300 rounded-lg overflow-hidden'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='py-3 px-4 border-b border-gray-300 text-left'>Sn</th>
            <th className='py-3 px-4 border-b border-gray-300 text-left'>
              Image
            </th>
            <th className='py-3 px-4 border-b border-gray-300 text-left'>
              Name
            </th>
            <th className='py-3 px-4 border-b border-gray-300 text-left'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((item, index) => {
            return <Row index={index} item={item} key={item?.id} />
          })}
        </tbody>
      </table>
    </div>
  )
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the brand "${item?.name}"?`
    )
    if (!confirmed) return

    setIsDeleting(true) // Start loading state
    try {
      await deleteAdmin({ id: item?.id })
      toast.success('Successfully Deleted')
    } catch (error) {
      toast.error(error?.message)
    } finally {
      setIsDeleting(false) // End loading state
    }
  }

  const handleEdit = () => {
    router.push(`/admin/admins?id=${item?.id}`)
  }

  return (
    <tr className='hover:bg-gray-50 transition-colors'>
      <td className='py-3 px-4 border-b border-gray-300'>{index + 1}</td>
      <td className='py-3 px-4 border-b border-gray-300'>
        <img
          src={item?.imageUrl || '/placeholder.jpg'}
          alt={item?.name}
          className='w-12 h-12 object-cover rounded-full'
        />
      </td>
      <td className='py-3 px-4 border-b border-gray-300'>
        <div className='flex flex-col'>
          <h2>{item?.name}</h2>
          <h3 className='text-xs text-gray-500'>{item?.email}</h3>
        </div>
      </td>
      <td className='py-3 px-4 border-b border-gray-300'>
        <div className='flex justify-center items-center gap-3'>
          {/* Edit icon */}
          <FaEdit
            className='text-blue-500 cursor-pointer hover:text-blue-600'
            onClick={handleEdit}
            disabled={isDeleting} // Replace with edit functionality
          />
          {/* Delete icon */}
          <FaTrash
            className={`text-red-500 cursor-pointer hover:text-red-600 ${
              isDeleting && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={handleDelete}
            disabled={isDeleting}
          />
        </div>
      </td>
    </tr>
  )
}
