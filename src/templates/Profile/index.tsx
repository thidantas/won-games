'use client'

import { usePathname } from 'next/navigation'

import Base from 'templates/Base'
import Heading from 'components/Heading'
import { Container } from 'components/Container'
import ProfileMenu, { ProfileRoutes } from 'components/ProfileMenu'
import AuthGuard from 'components/AuthGuard'

import * as S from './styles'

export type ProfileTemplateProps = {
  children: React.ReactNode
}

const Profile = ({ children }: ProfileTemplateProps) => {
  const pathName = usePathname()

  return (
    <AuthGuard>
      <Base>
        <Container>
          <Heading lineLeft lineColor="secondary">
            Profile
          </Heading>

          <S.Main>
            <ProfileMenu activeProfile={pathName as ProfileRoutes} />
            <S.Content>{children}</S.Content>
          </S.Main>
        </Container>
      </Base>
    </AuthGuard>
  )
}

export default Profile
