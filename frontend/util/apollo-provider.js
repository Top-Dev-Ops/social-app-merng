import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderContext,
  HttpLink,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

const httpLink = new HttpLink({
  uri: 'http://localhost:5000'
})

const authLink = setContext(() => {
  const token = globalThis.localStorage.getItem('jwtToken')

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


export default function ApolloProvider({ children }) {
  return (
    <ApolloProviderContext client={client}>
      {children}
    </ApolloProviderContext>
  )
}