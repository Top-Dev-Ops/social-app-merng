import { gql } from '@apollo/client'

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id body createdAt username likesCount commentsCount
      likes { username }
      comments { username createdAt body }
    }
  }
`