import { signOut } from 'next-auth/react'
import {
  ExitToApp,
  AccountCircle,
  FavoriteBorder
} from '@styled-icons/material-outlined'
import { ChevronDown } from '@styled-icons/boxicons-regular'

import Dropdown from 'components/Dropdown'

import * as S from './styles'

export type UserDropdownProps = {
  username: string
}

const UserDropdown = ({ username }: UserDropdownProps) => {
  return (
    <Dropdown
      title={
        <>
          <AccountCircle size={24} />
          <S.Username>{username}</S.Username>
          <ChevronDown size={24} />
        </>
      }
    >
      <S.Nav>
        <S.Link href="/profile/me">
          <AccountCircle />
          <span>My profile</span>
        </S.Link>

        <S.Link href="/wishlist">
          <FavoriteBorder />
          <span>Wishlist</span>
        </S.Link>

        <S.SignOut title="Sign out" role="button" onClick={() => signOut()}>
          <ExitToApp />
          <span>Sign Out</span>
        </S.SignOut>
      </S.Nav>
    </Dropdown>
  )
}

export default UserDropdown
