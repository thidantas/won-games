import makeClient from 'providers/ApolloProvider/client'
import ApolloProvider from 'providers/ApolloProvider'
import { getGames } from 'services/ssr/games/getGames'
import Games, { GamesProps } from 'templates/Games'
import exploreSidebarItemsMock from 'components/ExploreSidebar/mock'
import { filterSchemas } from 'app/games/schemas/filterSchemas'
import { parseQueryStringToFilters } from 'utils/filters'
import { Suspense } from 'react'

const mockProps: GamesProps = {
  filterSchemas: exploreSidebarItemsMock
}

export default async function GamesPage({
  searchParamsServer
}: {
  searchParamsServer?: { [key: string]: string | string[] }
}) {
  const isCI = process.env.NEXT_PUBLIC_CI === 'true'

  if (isCI) {
    return (
      <ApolloProvider initialState={{}}>
        <Suspense fallback={<>...</>}>
          <Games {...mockProps} />
        </Suspense>
      </ApolloProvider>
    )
  }

  const apolloClient = makeClient()

  const filters = parseQueryStringToFilters({
    queryString: searchParamsServer,
    filterSchemas
  })

  await getGames(apolloClient, {
    limit: 15,
    filters: filters,
    sort: searchParamsServer?.sort as string
  })

  const initialApolloState = JSON.parse(JSON.stringify(apolloClient.extract()))

  return (
    <ApolloProvider initialState={initialApolloState}>
      <Games filterSchemas={filterSchemas} />
    </ApolloProvider>
  )
}
