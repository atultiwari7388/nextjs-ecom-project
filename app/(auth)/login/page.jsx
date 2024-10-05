'use client'

import { Button } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { auth } from './../../../lib/firebase' // Ensure this path is correct
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'

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
          <SignInWithGoogleComponent />
          {/* Create Account Link */}
          <div className='text-center'>
            <span className='text-gray-600'>Don't have an account? </span>
            <a href='/sign-up' className='text-blue-500 hover:underline'>
              Create New Account
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function SignInWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      // You can handle the result here, e.g., redirecting the user or storing user info
      toast.success('Successfully signed in with Google!')
    } catch (error) {
      // It's good to log the error for debugging purposes
      console.error('Google Sign-In Error:', error)
      toast.error(
        error.message || 'Something went wrong during Google Sign-In.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      color='secondary'
      className='flex items-center justify-center gap-2'
      fullWidth
      isLoading={isLoading}
      isDisabled={isLoading}
      onClick={handleLogin}
    >
      <FcGoogle size={20} />
      Sign in with Google
    </Button>
  )
}
