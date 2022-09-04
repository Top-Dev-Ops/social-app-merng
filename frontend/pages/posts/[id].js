import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

import LikeButton from '../../components/likebutton'
import Comments from '../../components/comments'

import { AuthContext } from '../../contexts/auth'

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id body createdAt username likesCount commentsCount
      likes { username }
      comments { username createdAt body }
    }
  }
`

const Post = () => {

  const [showComments, setShowComments] = useState(true)

  const router = useRouter()

  const { id } = router.query

  const { user } = useContext(AuthContext)

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: id
    }
  })

  return (
    <div className="py-10 w-full relative">
      {data && data.getPost && (
        <>
          <div className="w-full flex flex-col gap-2">
            <div className="text-primary font-medium">{data.getPost.body}</div>
            <div className="mt-8 inline-flex flex-row gap-4">
              <LikeButton user={user} post={data.getPost} />
            </div>
          </div>

          {!showComments && (
            <div className="absolute z-10 top-6 right-6 text-primary">
              <button
                className="rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setShowComments(true)}
              >
                <ChevronDoubleLeftIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          )}
          <Comments
            open={showComments}
            setOpen={setShowComments}
            post={data.getPost}
          />
        </>
      )}
    </div>
  )
}

export default Post
