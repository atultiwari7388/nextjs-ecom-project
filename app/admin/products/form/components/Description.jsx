'use client'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'

// Dynamically import ReactQuill without SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

// Quill modules configuration
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: ['extra-small', 'small', 'medium', 'large'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ color: [] }, { background: [] }],
      ['clean'], // Corrected to put 'clean' in its own array
    ],
  },
}

export default function Description({ data, handleData }) {
  // Add local state for handling Quill input
  const [description, setDescription] = useState(data?.description || '')

  // Handle changes to the editor
  const handleChange = (value) => {
    setDescription(value)
    handleData('description', value) // Corrected the key to 'description'
  }

  return (
    <section className='flex flex-col gap-3 bg-white border p-4 rounded-xl h-full'>
      <h1 className='font-semibold'>Description</h1>
      <ReactQuill
        value={description} // Bind local state to ReactQuill value
        onChange={handleChange}
        modules={modules}
        placeholder='Enter your Description....'
      />
    </section>
  )
}

// 'use client'

// import dynamic from 'next/dynamic'
// import 'react-quill/dist/quill.snow.css'

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

// const modules = {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ size: ['extra-small', 'small', 'medium', 'large'] }],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link'],
//       [{ color: [] }, { background: [] }]['clean'],
//     ],
//   },
// }

// export default function Description({ data, handleData }) {
//   const handleChange = (value) => {
//     handleData('context', value)
//   }

//   return (
//     <section className='flex flex-col gap-3 bg-white border p-4 rounded-xl h-full'>
//       <h1 className='font-semibold'>Description</h1>
//       <ReactQuill
//         value={data?.description}
//         onChange={handleChange}
//         modules={modules}
//         placeholder='Enter your Description....'
//       />
//     </section>
//   )
// }
