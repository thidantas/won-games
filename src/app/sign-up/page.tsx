import Auth from 'templates/Auth'
import FormSignUp from 'components/FormSignUp'
import ApolloProvider from 'providers/ApolloProvider'

export default function SignUp() {
  return (
    <ApolloProvider>
      <Auth title="Sign Up">
        <FormSignUp />
      </Auth>
    </ApolloProvider>
  )
}
