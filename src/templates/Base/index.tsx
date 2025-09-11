'use client'

import { useSession } from 'next-auth/react'

import Menu from 'components/Menu'
import Footer from 'components/Footer'
import { Container } from 'components/Container'

import * as S from './styles'

export type BaseTemplateProps = {
  children: React.ReactNode
}

const Base = ({ children }: BaseTemplateProps) => {
  const { data: session, status } = useSession()

  return (
    <S.Wrapper>
      <Container>
        <Menu
          username={session?.user?.username}
          loading={status === 'loading'}
        />
      </Container>

      <S.Content>{children}</S.Content>

      <S.SectionFooter>
        <Container>
          <Footer />
        </Container>
      </S.SectionFooter>
    </S.Wrapper>
  )
}

export default Base
