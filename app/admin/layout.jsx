'use client'
import AdminLayout from './components/AdminLayout'
import AuthContextProvider from './../../context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@nextui-org/react'
import { useAuth } from '@/context/AuthContext'

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <AdminChecking>{children}</AdminChecking>
    </AuthContextProvider>
  )
}

function AdminChecking({ children }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if user is not logged in and not loading
    if (!user && !isLoading) {
      router.push('/login')
    }
  }, [user, isLoading, router]) // Include `router` in the dependency array

  if (isLoading) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <CircularProgress />
      </div>
    )
  }

  if (!user) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <h1>Please Login First</h1>
      </div>
    )
  }

  return <AdminLayout>{children}</AdminLayout>
}
