import { DefaultTheme } from 'styled-components'
import theme from 'styles/theme'

import * as S from './styles'

interface PacmanLoaderProps {
  color?: DefaultTheme['colors'][keyof DefaultTheme['colors']]
  ballSize?: number
}

export const PacmanLoading = ({
  color = theme.colors.yellow,
  ballSize = 15
}: PacmanLoaderProps) => {
  const pacmanSize = ballSize * 2.5

  return (
    <S.PacmanAnimation
      color={color}
      ballSize={ballSize}
      pacmanSize={pacmanSize}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </S.PacmanAnimation>
  )
}
