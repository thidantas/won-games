import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useMutation } from '@apollo/client'

import { MUTATION_REGISTER } from 'graphql/mutations/auth/register'

function useRegister() {
  const [sanitizedApolloErrors, setSanitizedApolloErrors] = useState('')
  const [createUser, { data, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) => {
      let message = 'Unexpected error'

      if (err?.graphQLErrors?.length) {
        message = err.graphQLErrors[0].message
      } else if (err?.message) {
        message = err.message
      }

      setSanitizedApolloErrors(message)
    }
  })

  const register = async (inputValues: {
    username: string
    email: string
    password: string
  }) => {
    const response = await createUser({
      variables: {
        registerInput: inputValues
      }
    })

    if (response.data?.register) {
      await signIn('credentials', {
        email: inputValues.email,
        password: inputValues.password,
        callbackUrl: '/'
      })
    }

    return response
  }

  return { register, data, loading, error: sanitizedApolloErrors }
}

export default useRegister
