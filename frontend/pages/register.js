import { useState } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'

import { useForm } from '../util/hook'

const REGISTER = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
  ) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
      }
    ) {
      id email name createdAt token
    }
  }
`

export default function Register() {
  const [errors, setErrors] = useState({})

  const router = useRouter()

  const { onChange, onSubmit, value } = useForm(registerUser, {
    name: '',
    email: '',
    password: '',
  })

  const [addUser, { loading }] = useMutation(REGISTER, {
    update(proxy, result) {
      router.push('/')
    },
    onError (err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: value,
  })

  function registerUser() {
    addUser()
  }

  return (
    <div className="my-4 w-64 sm:w-96">
      <h3 className="text-lg leading-6 font-medium text-primary text-center">REGISTER</h3>

      <div className="mt-6 flex flex-col gap-8">
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
          <label htmlFor="email" className="block text-sm font-medium text-disabled">
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
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
            REGISTER
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
    </div>
  )
}
