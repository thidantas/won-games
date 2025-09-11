import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getRecommendedGames } from 'services/ssr/games/getRecommendedGames'
import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'
import { HighlightProps } from 'components/Highlight'
import highlightMock from 'components/Highlight/mock'
import gameCardSliderItemsMock from 'components/GameCardSlider/mock'

const mockProps: WishlistTemplateProps = {
  games: gameCardSliderItemsMock,
  recommendedGames: gameCardSliderItemsMock.slice(0, 5),
  recommendedHighlight: highlightMock
}

export default async function WishlistPage() {
  const isCI = process.env.CI === 'true'

  if (isCI) {
    return <Wishlist {...mockProps} />
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  const recommended = await getRecommendedGames()

  return (
    <Wishlist
      recommendedTitle={recommended?.recommendedTitle}
      recommendedGames={recommended?.recommendedGames}
      recommendedHighlight={recommended?.recommendedHighlight as HighlightProps}
    />
  )
}
