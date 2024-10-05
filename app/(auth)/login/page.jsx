import { Button } from '@nextui-org/react'
import { FcGoogle } from 'react-icons/fc'

export default function Page() {
  return (
    <main className='w-full flex justify-center items-center bg-gray-100 p-4 min-h-screen'>
      <section className='flex flex-col gap-6 w-full max-w-md'>
        {/* Logo Section */}
        <div className='flex justify-center'>
          <img className='h-28' src='/logo.png' alt='Company logo' />
        </div>

        {/* Login Form Container */}
        <div className='flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg'>
          {/* Header */}
          <h1 className='text-2xl font-semibold text-center text-gray-800'>
            Login With Email
          </h1>

          {/* Login Form */}
          <form className='flex flex-col gap-4'>
            <input
              placeholder='Enter Your Email'
              type='email'
              name='user-email'
              id='user-email'
              className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              required
            />
            <input
              placeholder='Enter Your Password'
              type='password'
              name='user-pass'
              id='user-pass'
              className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              required
            />
            <Button color='primary' className='mt-2' fullWidth>
              Login
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className='text-right'>
            <a
              href='/forgot-password'
              className='text-sm text-blue-500 hover:underline'
            >
              Forgot Password?
            </a>
          </div>

          {/* Divider */}
          <div className='flex items-center my-4'>
            <hr className='flex-grow border-gray-300' />
            <span className='mx-2 text-gray-500'>OR</span>
            <hr className='flex-grow border-gray-300' />
          </div>

          {/* Social Login Button */}
          <Button
            color='secondary'
            className='flex items-center justify-center gap-2'
            fullWidth
          >
            <FcGoogle size={20} />
            Sign in with Google
          </Button>

          {/* Create Account Link */}
          <div className='text-center'>
            <span className='text-gray-600'>Don't have an account? </span>
            <a href='/create-account' className='text-blue-500 hover:underline'>
              Create New Account
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

// import { Button } from '@nextui-org/react'

// export default function Page() {
//   return (
//     <main className='w-full flex justify-center items-center bg-gray-300 p-24 min-h-screen'>
//       <section className='flex flex-col gap-3'>
//         <div className='flex justify-center'>
//           <img className='h-28' src='/logo.png' alt='Company logo' />
//         </div>
//         <div className='flex flex-col gap-3 bg-white p-10 rounded-xl min-w-[440px]'>
//           <h1 className='font-bold text-xl'>Login With Email</h1>
//           <form className='flex flex-col gap-3'>
//             <input
//               placeholder='Enter Your Email'
//               type='email'
//               name='user-email'
//               id='user-email'
//               className='px-3 py-2 rounded-xl border focus:outline-none w-full'
//             />
//             <input
//               placeholder='Enter Your Password'
//               type='password'
//               name='user-pass'
//               id='user-pass'
//               className='px-3 py-2 rounded-xl border focus:outline-none w-full'
//             />
//             <Button color='primary'>Login</Button>
//           </form>
//           <hr />
//           <Button color='primary'>Sign in with Google</Button>
//         </div>
//       </section>
//     </main>
//   )
// }
