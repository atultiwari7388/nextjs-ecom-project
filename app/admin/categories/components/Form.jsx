'use client'

import { Button } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  createNewCategory,
  updateCategory,
} from './../../../../lib/firestore/categories/write'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCategory } from './../../../../lib/firestore/categories/read_server'

export default function Form() {
  const [data, setData] = useState({})
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const router = useRouter()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const fetchData = async () => {
    try {
      const res = await getCategory({ id: id })
      if (!res) {
        toast.error('Category not found')
      } else {
        setData(res)
      }
    } catch (error) {
      console.error(error?.message)
      toast.error(error?.message || 'An error occurred')
    }
  }

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  const handleData = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleCreate = async () => {
    setIsLoading(true)
    try {
      await createNewCategory({ data, image })
      toast.success('Successfully created')
      setData({}) // Reset data after successful creation
      setImage(null) // Reset image
    } catch (error) {
      console.error(error?.message)
      toast.error(error?.message || 'An error occurred')
    }
    setIsLoading(false)
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      await updateCategory({ data, image })
      toast.success('Successfully updated')
      setData({}) // Reset data after successful creation
      setImage(null) // Reset image
      router.push(`/admin/categories`)
    } catch (error) {
      console.error(error?.message)
      toast.error(error?.message || 'An error occurred')
    }
    setIsLoading(false)
  }

  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
      <h1 className='font-semibold'>{id ? 'Update' : 'Create'} Category</h1>
      <form
        className='flex flex-col gap-3'
        onSubmit={(e) => {
          e.preventDefault()
          if (id) {
            handleUpdate()
          } else {
            handleCreate()
          }
        }}
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='category-image' className='text-gray-500 text-sm'>
            Image <span className='text-red-500'>*</span>
          </label>
          {image && (
            <div className='flex justify-center items-center p-3'>
              <img
                className='h-20'
                src={URL.createObjectURL(image)}
                alt='Selected preview'
              />
              <button
                type='button'
                onClick={() => setImage(null)}
                className='ml-2 text-red-500'
              >
                Remove
              </button>
            </div>
          )}
          <input
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0])
              }
            }}
            id='category-image'
            name='category-image'
            type='file'
            accept='image/*' // Restrict to image files
            className='border px-4 py-2 rounded-lg w-full focus:outline-none'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='category-name' className='text-gray-500 text-sm'>
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            id='category-name'
            name='category-name'
            type='text'
            placeholder='Enter Name'
            value={data.name || ''}
            onChange={(e) => handleData('name', e.target.value)}
            className='border px-4 py-2 rounded-lg w-full focus:outline-none'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='category-slug' className='text-gray-500 text-sm'>
            Slug <span className='text-red-500'>*</span>
          </label>
          <input
            id='category-slug'
            name='category-slug'
            type='text'
            placeholder='Enter slug'
            value={data.slug || ''}
            onChange={(e) => handleData('slug', e.target.value)}
            className='border px-4 py-2 rounded-lg w-full focus:outline-none'
          />
        </div>
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          color='primary'
          type='submit'
        >
          {id ? 'Update' : 'Create'}
        </Button>
      </form>
    </div>
  )
}
