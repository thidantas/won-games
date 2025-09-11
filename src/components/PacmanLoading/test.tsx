import { render } from '@testing-library/react'

import theme from 'styles/theme'
import { PacmanLoading } from '.'

describe('<PacmanLoader />', () => {
  it('should render 5 divs (2 pacman + 3 balls)', () => {
    const { container } = render(<PacmanLoading />)
    const pacman = container.firstChild as HTMLElement
    const divs = pacman?.children ?? []
    expect(divs.length).toBe(5)
  })

  it('should apply the default color', () => {
    const { container } = render(<PacmanLoading />)
    const pacman = container.firstChild as HTMLElement
    const firstDiv = pacman.children[0] as HTMLElement
    expect(firstDiv).toHaveStyle(
      `border: ${15 * 2.5}px solid ${theme.colors.yellow}`
    )
  })

  it('should apply a custom color', () => {
    const { container } = render(<PacmanLoading color={theme.colors.red} />)
    const pacman = container.firstChild as HTMLElement
    const firstDiv = pacman.children[0] as HTMLElement
    expect(firstDiv).toHaveStyle(
      `border: ${15 * 2.5}px solid ${theme.colors.red}`
    )
  })

  it('should apply custom ballSize and calculate pacmanSize', () => {
    const ballSize = 20
    const pacmanSize = ballSize * 2.5
    const { container } = render(<PacmanLoading ballSize={ballSize} />)
    const pacman = container.firstChild as HTMLElement
    const firstDiv = pacman.children[0] as HTMLElement
    const thirdDiv = pacman.children[2] as HTMLElement

    expect(firstDiv).toHaveStyle(
      `border: ${pacmanSize}px solid ${theme.colors.yellow}`
    )
    expect(thirdDiv).toHaveStyle(`width: ${ballSize}px`)
    expect(thirdDiv).toHaveStyle(`height: ${ballSize}px`)
  })

  it('should match snapshot', () => {
    const { container } = render(<PacmanLoading />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
