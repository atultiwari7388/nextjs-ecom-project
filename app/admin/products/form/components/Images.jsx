export default function Images({
  data,
  setFeatureImage,
  featureImages,
  imageList,
  setImageList,
}) {
  return (
    <section className='flex flex-col gap-3 bg-white border p-4 rounded-xl'>
      <h1 className='font-semibold'>Images</h1>

      {/* Feature Image Section */}
      <div className='flex flex-col gap-1'>
        {data?.featureImageUrl && !featureImages && (
          <div className='flex justify-center'>
            {console.log('Feature image: ', data?.featureImageUrl)}{' '}
            {/* Log feature image */}
            <img
              className='h-20 object-cover'
              src={data?.featureImageUrl}
              alt='Feature-Image'
            />
          </div>
        )}
        {featureImages && (
          <div className='flex justify-center'>
            {console.log('Feature image: ', featureImages)}{' '}
            {/* Log feature image */}
            <img
              className='h-20 object-cover'
              src={URL.createObjectURL(featureImages)}
              alt='Feature-Image'
            />
          </div>
        )}
        <label
          className='text-gray-500 text-xs'
          htmlFor='product-feature-image'
        >
          Feature Image<span className='text-red-500'>*</span>
        </label>
        <input
          type='file'
          id='product-feature-image'
          name='product-feature-image'
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFeatureImage(e.target.files[0]) // Ensure the file object is set correctly
            }
          }}
          className='border px-4 py-2 rounded-lg w-full outline-none'
        />
      </div>

      {/* Additional Images Section */}
      <div className='flex flex-col gap-1'>
        {imageList?.length === 0 && data?.imageList?.length != 0 && (
          <div className='flex gap-2 flex-wrap'>
            {data?.imageList.map((item, index) => (
              <img
                key={index}
                className='h-20 object-cover'
                src={item}
                alt=''
              />
            ))}
          </div>
        )}

        {imageList?.length > 0 && (
          <div className='flex gap-2 flex-wrap'>
            {imageList.map((item, index) => (
              <img
                key={index}
                className='h-20 object-cover'
                src={URL.createObjectURL(item)}
                alt=''
              />
            ))}
          </div>
        )}
        <label className='text-gray-500 text-xs' htmlFor='product-images'>
          Images<span className='text-red-500'>*</span>
        </label>
        <input
          type='file'
          id='product-images'
          name='product-images'
          multiple
          onChange={(e) => {
            const filesArray = Array.from(e.target.files)
            setImageList((prevList) => [...prevList, ...filesArray]) // Append new files to existing list
          }}
          className='border px-4 py-2 rounded-lg w-full outline-none'
        />
      </div>
    </section>
  )
}
