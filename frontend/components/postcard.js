import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CodeIcon, DotsVerticalIcon, FlagIcon, StarIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartOutlineIcon, ChatIcon } from '@heroicons/react/outline'
import moment from 'moment'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PostCard({
  post: { body, createdAt, username, likesCount, commentsCount }
}) {

  const likePost = () => {

  }

  const createComment = () => {

  }

  return (
    <div className="bg-stack-2 px-4 py-5 sm:px-6 rounded-lg w-full flex-1 flex flex-col justify-between">
      {/* post header */}
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full border-b-2 border-primary"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
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
              <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'flex px-4 py-2 text-sm'
                        )}
                      >
                        <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Add to favorites</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'flex px-4 py-2 text-sm'
                        )}
                      >
                        <CodeIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Embed</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'flex px-4 py-2 text-sm'
                        )}
                      >
                        <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Report content</span>
                      </a>
                    )}
                  </Menu.Item>
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
        <button
          type="button"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-primary hover:text-current"
          onClick={likePost}
        >
          <HeartOutlineIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
          {likesCount}
        </button>
        <button
          type="button"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-xs text-primary hover:text-teal-500"
          onClick={createComment}
        >
          <ChatIcon className="h-8 w-8 mr-1 p-1.5 bg-transparent hover:bg-stack-3 rounded-full" aria-hidden="true" />
          {commentsCount}
        </button>
      </div>
    </div>
  )
}
