import { Fragment, useRef, useContext, useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import Avatar from './avatar'
import { AuthContext } from '../contexts/auth'

const COMMENT = gql`
  mutation Comment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentsCount
    }
  }
`

export default function CommentDialog({
  open,
  setOpen,
  id,
}) {
  
  const cancelButtonRef = useRef(null)

  const { user } = useContext(AuthContext)
  const username = user ? user.name.split(' ').map(nam => nam[0]).join('') : ''

  const [comment, setComment] = useState('')

  const [createComment] = useMutation(COMMENT, {
    update() {
      setComment('')
    },
    variables: {
      postId: id,
      body: comment
    }
  })

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-stack-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-stack-1 px-4 pt-5 pb-4 sm:py-2">
                  <div>
                    <button
                      className="flex h-12 w-12 items-center justify-left rounded-full sm:mx-0 sm:h-10 sm:w-10"
                      onClick={() => setOpen(false)}
                    >
                      <XIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </button>
                    <div className="mt-4 text-center sm:text-left flex justify-between items-center gap-4">
                      <Avatar name={username} />
                      <input
                        id="body"
                        name="body" 
                        type="text"
                        className="shadow-sm border-2 border-transparent focus:border-current focus:border-2 focus:ring-0 inline flex-1 w-full sm:text-sm rounded-full"
                        placeholder="Tweet your reply"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-stack-1 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline justify-center items-center px-5 py-1 border border-transparent text-base font-medium rounded-full shadow-sm text-primary bg-primary hover:opacity-90 disabled:cursor-not-allowed"
                    onClick={() => {
                      setOpen(false)
                      createComment()
                    }}
                    disabled={comment.trim() === ''}
                  >
                    Reply
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
