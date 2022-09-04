import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'

import PostCard from '../components/postcard'
import PostForm from '../components/postform'
import Divider from '../components/divider'
import Loading from '../components/loading'

import { FETCH_POSTS_QUERY } from '../util/graphql'

export default function Home() {

  const {
    loading,
    data
  } = useQuery(FETCH_POSTS_QUERY)
  
  return (
    <div className="px-5 flex flex-col w-full">
      <Head>
        <title>Social App</title>
        <meta name="description" content="Social App in MERNG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostForm />
      <Divider />

      <h1 className="text-primary my-4 font-bold">RECENT POSTS</h1>

      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full">
          {data && data.getPosts && data.getPosts.map(post => (
            <PostCard key={post.id} post={post}></PostCard>
          ))}
        </div>
      )}
    </div>
  )
}
