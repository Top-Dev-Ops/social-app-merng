import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import Navbar from './navbar'
import { AuthContext } from '../contexts/auth'

export default function Layout({ children }) {

  const router = useRouter()

  const { user } = useContext(AuthContext)

  useEffect(() => {
    globalThis.document.documentElement.classList.add('dark')

    if (user) router.push('/')
  }, [])

  return (
    <div className="bg-stack-1 max-w-7xl min-h-screen relative flex flex-row w-full justify-center items-start">
      <Navbar />

      <div className="pt-16 flex flex-row justify-center w-full h-full">
        {children}
      </div>
    </div>
  )
}