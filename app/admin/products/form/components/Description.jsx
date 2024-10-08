'use client'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: ['extra-small', 'small', 'medium', 'large'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ color: [] }, { background: [] }]['clean'],
    ],
  },
}

export default function Description({ data, handleData }) {
  const handleChange = (value) => {
    handleData('context', value)
  }

  return (
    <section className='flex-1 flex flex-col gap-3 bg-white border p-4 rounded-xl'>
      <h1 className='font-semibold'>Description</h1>
      <ReactQuill
        value={data?.description}
        onChange={handleChange}
        modules={modules}
        placeholder='Enter your Description....'
      />
    </section>
  )
}
