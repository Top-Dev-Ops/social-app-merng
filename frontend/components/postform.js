import { useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { PhotographIcon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'

import Loading from '../components/loading'
import Avatar from '../components/avatar'

import { AuthContext } from '../contexts/auth'
import { useForm } from '../util/hook'
import { FETCH_POSTS_QUERY } from '../util/graphql'

const CREATE_POST = gql`
  mutation CreatePost(
    $body: String!
  ) {
    createPost(body: $body) {
      id body createdAt username
      likes {
        id username createdAt
      }
      comments {
        id body username createdAt
      }
      likesCount
      commentsCount
    }
  }
`

export default function PostForm() {

  const { onChange, onSubmit, value } = useForm(createPostCallback, { body: '' })

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, results) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: [results.data.createPost, ...data.getPosts]
        }
      })
      value.body = ''
    },
    variables: value
  })

  const { user } = useContext(AuthContext)
  const username = user ? user.name.split(' ').map(nam => nam[0]).join('') : ''

  function createPostCallback() {
    createPost()
  }

  return (
    <div className="my-8">
      <div className="w-full flex justify-between gap-6">
        <Avatar name={username} />
        <input
          id="body"
          name="body" 
          type="text"
          className="shadow-sm border-2 border-transparent focus:border-current focus:border-2 focus:ring-0 inline flex-1 w-full sm:text-sm rounded-full"
          onChange={onChange}
          placeholder="What's happening?"
        />
      </div>

      <div className="flex items-center mt-4 gap-8">
        <div>
          <button
            className="inline justify-center items-center px-5 py-1 border border-transparent text-base font-medium rounded-full shadow-sm text-primary bg-primary hover:opacity-90"
            onClick={onSubmit}
          >
            Tweet
          </button>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-current"
            onClick={() => {}}
          >
            <PhotographIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-current"
            onClick={() => {}}
          >
            <EmojiHappyIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-current"
            onClick={() => {}}
          >
            <CalendarIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
          </button>
        </div>        
      </div>

      {error && (
        <div className="text-red-600 mt-4 text-sm font-bold">
          {error.graphQLErrors[0].message}
        </div>
      )}
    </div>
  )
}
