import '../styles/globals.css'
import ApolloProvider from '../util/apollo-provider'
import Layout from '../components/layout'
import { AuthProvider } from '../contexts/auth'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
