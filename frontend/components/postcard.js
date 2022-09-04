import { Fragment, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { gql, useMutation } from '@apollo/client'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { ChatIcon, TrashIcon } from '@heroicons/react/outline'
import moment from 'moment'

import LikeButton from './likebutton'
import CommentDialog from './commentdialog'
import { AuthContext } from '../contexts/auth'
import { FETCH_POSTS_QUERY } from '../util/graphql'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DELETE = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export default function PostCard({ post }) {

  const { user } = useContext(AuthContext)

  const [showCommentDialog, setShowCommentDialog] = useState(false)

  const { id, body, createdAt, username, commentsCount } = post

  const router = useRouter()

  const [deletePost] = useMutation(DELETE, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: data.getPosts.filter(post => post.id !== id)
        }
      })
    },
    variables: {
      postId: id
    }
  })

  return (
    <div
      className="bg-stack-2 px-4 py-5 sm:px-6 rounded-lg w-full flex-1 flex flex-col justify-between hover:cursor-pointer"
      onClick={() => router.push(`/posts/${id}`)}
    >
      {/* post header */}
      <div className="flex space-x-3">
        <div className="flex-shrink-0 w-10 h-10 relative rounded-full border-b-2 border-primary">
          <Image
            className="rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="min-w-0 flex-1 items-center">
          <p className="text-sm font-medium text-primary">
            {username}
          </p>
          <p className="text-xs text-secondary uppercase">
            {moment(createdAt).fromNow(true)}
          </p>
        </div>
        <div className="flex-shrink-0 self-center flex">
          <Menu as="div" className="relative z-30 inline-block text-left">
            <div>
              <Menu.Button
                className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
                onClick={e => e.stopPropagation()}
              >
                <span className="sr-only">Open options</span>
                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-stack-1"
                style={{ boxShadow: 'rgb(255 255 255 / 20%) 0px 0px 15px, rgb(255 255 255 / 15%) 0px 0px 3px 1px' }}
              >
                <div>
                  {user && user.name === username && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active ? 'bg-stack-3' : '',
                            'w-full flex px-4 text-sm text-red-600 items-center'
                          )}
                          onClick={() => deletePost(id)}
                        >
                          <TrashIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* post body */}
      <div className="text-disabled text-sm my-4">{body}</div>

      {/* likes & comments */}
      <div className="flex justify-start gap-4">
        <LikeButton user={user} post={post} />

        <button
          type="button"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-primary hover:text-teal-500"
          onClick={e => {
            e.stopPropagation();
            setShowCommentDialog(true)
          }}
        >
          <ChatIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
          {commentsCount}
        </button>
      </div>

      <CommentDialog
        open={showCommentDialog}
        setOpen={setShowCommentDialog}
        id={id}
      />
    </div>
  )
}
