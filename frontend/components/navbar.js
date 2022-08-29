import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { AuthContext } from '../contexts/auth'

export default function Navbar() {

  const { pathname } = useRouter()

  const { user, logout } = useContext(AuthContext)

  return (
    <div className="flex flex-row justify-between items-center fixed mx-auto w-full top-0 p-5 z-50 border-b border-stack-4 max-w-7xl">
      <Link href="/">
        <a
          className={`${pathname === '/' ? 'text-current' : 'text-disabled'} font-semibold`}
        >
          HOME
        </a>
      </Link>

      {user ? (
        <Link href="/">
          <a
            className="text-disabled font-semibold"
            onClick={logout}
          >
            LOGOUT
          </a>
        </Link>
      ) : (
        <div className="flex flex-row gap-8">
          <Link href="/login">
            <a
              className={`${pathname === '/login' ? 'text-current' : 'text-disabled'} font-semibold`}
            >
              LOGIN
            </a>
          </Link>
          <Link href="/register">
          <a
            className={`${pathname === '/register' ? 'text-current' : 'text-disabled'} font-semibold`}
          >
            REGISTER
          </a>
          </Link>
        </div>
      )}
      </div>
  )
}