import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useGames } from 'services/client/games/useGames'
import { renderWithTheme } from 'utils/tests/helpers'
import exploreSidebarItemsMock from 'components/ExploreSidebar/mock'
import { useRouter, usePathname } from 'next/navigation'

import Games from '.'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  })),
  usePathname: jest.fn(() => '/games' as ReturnType<typeof usePathname>),
  useSearchParams: jest.fn(() => new URLSearchParams())
}))

jest.mock('services/client/games/useGames', () => ({
  useGames: jest.fn()
}))

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseGames = useGames as jest.Mock

describe('<Games />', () => {
  beforeEach(() => {
    mockUseRouter.mockClear()
    mockUseGames.mockReset()
  })

  it('should render the loading state', () => {
    mockUseGames.mockImplementation(() => ({
      data: [],
      loading: true,
      error: null,
      handleFetchMore: jest.fn()
    }))

    renderWithTheme(<Games filterSchemas={exploreSidebarItemsMock} />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('should render the sections', async () => {
    mockUseGames.mockImplementation(() => ({
      data: [{ id: '1', title: 'Sample Game' }],
      total: 2,
      loading: false,
      error: null,
      handleFetchMore: jest.fn()
    }))

    renderWithTheme(<Games filterSchemas={exploreSidebarItemsMock} />)

    expect(await screen.findByText(/Price/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: /show more/i })
    ).toBeInTheDocument()
  })

  it('should not render Show More Button', () => {
    mockUseGames.mockImplementation(() => ({
      data: [{ id: '1', title: 'Sample Game' }],
      total: 1,
      loading: false,
      error: null,
      handleFetchMore: jest.fn()
    }))

    renderWithTheme(<Games filterSchemas={exploreSidebarItemsMock} />)

    expect(
      screen.queryByRole('button', { name: /show more/i })
    ).not.toBeInTheDocument()
  })

  it('should render empty when no games found', () => {
    mockUseGames.mockImplementation(() => ({
      data: [],
      loading: false,
      error: null,
      handleFetchMore: jest.fn()
    }))

    renderWithTheme(<Games filterSchemas={exploreSidebarItemsMock} />)

    expect(
      screen.getByText(/We didn't find any games with this filter/i)
    ).toBeInTheDocument()
  })

  it('should render more games when show more is clicked', async () => {
    const handleFetchMoreMock = jest.fn()

    mockUseGames.mockImplementation(() => ({
      data: [{ id: '1', title: 'Sample Game' }],
      total: 2,
      loading: false,
      error: null,
      handleFetchMore: handleFetchMoreMock
    }))

    renderWithTheme(<Games filterSchemas={exploreSidebarItemsMock} />)

    expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument()

    await userEvent.click(
      await screen.findByRole('button', { name: /show more/i })
    )

    expect(handleFetchMoreMock).toHaveBeenCalled()
  })

  it('should change push router when selecting a filter', async () => {
    const routerPushMock = jest.fn()

    mockUseGames.mockImplementation(() => ({
      data: [{ id: '1', title: 'Sample Game' }],
      loading: false,
      error: null,
      handleFetchMore: jest.fn()
    }))

    mockUseRouter.mockReturnValue({
      push: routerPushMock
    })

    renderWithTheme(<Games filterSchemas={exploreSidebarItemsMock} />)

    const windowsCheckbox = await screen.findByRole('checkbox', {
      name: /windows/i
    })

    const linuxCheckbox = await screen.findByRole('checkbox', {
      name: /linux/i
    })

    const radioSort = await screen.findByLabelText(/low to high/i)

    userEvent.click(windowsCheckbox)
    userEvent.click(linuxCheckbox)
    userEvent.click(radioSort)

    await waitFor(() => {
      expect(windowsCheckbox).toBeChecked()
      expect(linuxCheckbox).toBeChecked()
      expect(radioSort).toBeChecked()
    })

    const lastCall = routerPushMock.mock.calls.at(-1)[0]
    expect(lastCall).toBe(
      '/games?platforms=windows&platforms=linux&sort_by=low-to-high'
    )
  })
})
