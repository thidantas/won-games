import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { env } from 'lib/config/env'

async function authenticateUser(email: string, password: string) {
  try {
    const response = await fetch(`${env.BASE_API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: email,
        password: password
      })
    })

    const data = await response.json()

    if (!response.ok || !data.jwt || !data.user) {
      return null
    }

    return {
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email
      },
      accessToken: data.jwt,
      refreshToken: null,
      expiresIn: 3600
    }
  } catch (error) {
    console.error('Error during authentication:', error)
    return null
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign-in',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const authResult = await authenticateUser(
          credentials.email,
          credentials.password
        )

        if (!authResult) {
          return null
        }

        return {
          id: authResult.user.id,
          email: authResult.user.email,
          username: authResult.user.username,
          accessToken: authResult.accessToken,
          refreshToken: authResult.refreshToken,
          accessTokenExpires: Date.now() + authResult.expiresIn * 1000
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires
        }
      }

      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // TODO: develop refresh token logic in the future
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email
        }

        session.accessToken = token.accessToken
        session.error = token.error
      }

      return session
    }
  },
  secret: env.AUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
