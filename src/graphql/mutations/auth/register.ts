import { graphql } from 'graphql/generated'

export const MUTATION_REGISTER = graphql(`
  mutation MutationRegister($registerInput: UsersPermissionsRegisterInput!) {
    register(input: $registerInput) {
      jwt
    }
  }
`)
