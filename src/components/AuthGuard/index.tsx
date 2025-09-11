'use client'

import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

import { PacmanLoading } from 'components/PacmanLoading'

import * as S from './styles'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()
  const pathUrl = usePathname()

  const router = useRouter()

  useEffect(() => {
    if (session?.error) {
      signOut({ callbackUrl: '/sign-in' })
    }

    if (status === 'unauthenticated') {
      router.push(`/sign-in?callbackUrl=${pathUrl}`)
    }
  }, [session, status, router, pathUrl])

  if (status === 'loading') {
    return (
      <S.LoadingWrapper>
        <PacmanLoading ballSize={25} />
      </S.LoadingWrapper>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <S.LoadingWrapper>
        <PacmanLoading ballSize={25} />
      </S.LoadingWrapper>
    )
  }

  return <>{children}</>
}

export default AuthGuard
