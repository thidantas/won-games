'use client'

import styled, { css, keyframes } from 'styled-components'

interface PacmanAnimationProps {
  color: string
  ballSize: number
  pacmanSize: number
}

export const rotatePacmanHalfUp = keyframes`
  0% { transform: rotate(270deg); }
  50% { transform: rotate(360deg); }
  100% { transform: rotate(270deg); }
`

export const rotatePacmanHalfDown = keyframes`
  0% { transform: rotate(90deg); }
  50% { transform: rotate(0deg); }
  100% { transform: rotate(90deg); }
`

const pacmanBalls = (pacmanSize: number) => keyframes`
  75% { opacity: 0.7; }
  100% { transform: translateX(-${pacmanSize * 2.5}px); }
`

export const PacmanAnimation = styled.div<PacmanAnimationProps>`
  ${({ ballSize, color, pacmanSize }) => css`
    position: relative;

    & > div:nth-child(1),
    & > div:nth-child(2) {
      width: 0;
      height: 0;
      border: ${pacmanSize}px solid ${color};
      border-right-color: transparent;
      border-radius: 50%;
      left: -${ballSize * 4}px;
      animation: ${rotatePacmanHalfUp} 0.5s infinite;
      position: relative;
    }

    & > div:nth-child(2) {
      animation-name: ${rotatePacmanHalfDown};
      margin-top: -${pacmanSize * 2}px;
    }

    & > div:nth-child(3),
    div:nth-child(4),
    div:nth-child(5) {
      animation: ${pacmanBalls(pacmanSize)} 1s infinite linear;
      background-color: ${color};
      border-radius: 100%;
      width: ${ballSize}px;
      height: ${ballSize}px;
      position: absolute;
      top: ${ballSize * 2}px;
      left: ${pacmanSize * 2}px;
    }

    & > div:nth-child(3) {
      animation-delay: -0.66s;
    }
    & > div:nth-child(4) {
      animation-delay: -0.33s;
    }
  `}
`
