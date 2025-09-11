import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User extends DefaultUser {
    id?: string | number | null
    username?: string | null
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpires: number
  }

  interface Session extends DefaultSession {
    user: {
      id?: string | number | null
      username?: string | null
      email?: string | null
    }
    accessToken?: string | null
    error?: string | unknown
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string | number | null
    username?: string | null
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpires: number
  }
}
