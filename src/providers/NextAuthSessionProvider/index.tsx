'use client'

import { SessionProvider } from 'next-auth/react'

function NextAuthSessionProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthSessionProvider
