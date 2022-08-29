import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../contexts/auth'

import { useForm } from '../util/hook'
import Loading from '../components/loading'

const LOGIN = gql`
  mutation Login(
    $name: String!
    $password: String!
  ) {
    login(
      name: $name
      password: $password
    ) {
      id email name createdAt token
    }
  }
`

export default function Login() {
  const [errors, setErrors] = useState({})

  const context = useContext(AuthContext)

  const router = useRouter()

  const { onChange, onSubmit, value } = useForm(loginUser, {
    name: '',
    password: '',
  })

  const [login, { loading }] = useMutation(LOGIN, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData)
      router.push('/')
    },
    onError (err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: value,
  })

  function loginUser() {
    login()
  }

  return (
    <div className="my-4 w-64 sm:w-96">
      <h3 className="text-lg leading-6 font-medium text-primary text-center">LOGIN</h3>

      <div className={`mt-6 flex flex-col gap-8 ${loading ? 'opacity-60' : ''}`}>
        <div className="w-full">
          <label htmlFor="name" className="block text-sm font-medium text-disabled">
            Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="shadow-sm border-2 border-transparent focus:border-current focus:border-2 focus:ring-0 block w-full sm:text-sm rounded-full"
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-disabled">
            password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              className="shadow-sm border-2 border-transparent focus:border-current focus:border-2 focus:ring-0 block w-full sm:text-sm rounded-full"
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="mt-4 inline justify-center items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-primary bg-primary hover:opacity-90"
            onClick={onSubmit}
          >
            LOGIN
          </button>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="px-5 py-2">
          <ul>
            {Object.values(errors).map(value => (
              <li key={value} className="text-red-600">{value}</li>
            ))}
          </ul>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 top-60 flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  )
}
