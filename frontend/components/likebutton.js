import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/outline'

const LIKE_POST =gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      username
      likes {
        id
        username
        createdAt
      }
    }
  }
`

export default function LikeButton({
  user,
  post: { id, likes, likesCount },
}) {
  const [liked, setLiked] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (user && likes.find(like => like.username === user.name)) setLiked(true)
    else setLiked(false)
  }, [])

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id }
  })

  const likeButton = user ? (
    liked ? (
      <button
        type="button"
        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-primary hover:text-current"
        onClick={e => {
          e.stopPropagation()
          likePost()
        }}
      >
        <HeartSolidIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full text-default" aria-hidden="true" />
        {likesCount}
      </button>
    ) : (
      <button
        type="button"
        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-primary hover:text-current"
        onClick={e => {
          e.stopPropagation()
          likePost()
        }}
      >
        <HeartOutlineIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
        {likesCount}
      </button>
    )
  ) : (
    <button
      type="button"
      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-primary hover:text-current"
      onClick={(e) => {
        e.stopPropagation()
        router.push('/login')
      }}
    >
      <HeartOutlineIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
      {likesCount}
    </button>
  )

  return likeButton
}