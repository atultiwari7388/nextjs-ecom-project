'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [user, setuser] = useState(undefined)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user)
      } else {
        setuser(null)
      }
    })
    return () => unsub()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: user === undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
