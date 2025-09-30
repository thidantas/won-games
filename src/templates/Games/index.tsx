'use client'

import { useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'

import { useGames } from 'services/client/games/useGames'
import Base from 'templates/Base'
import Empty from 'components/Empty'
import GameCard from 'components/GameCard'
import { Grid } from 'components/Grid'
import { PacmanLoading } from 'components/PacmanLoading'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import {
  parseQueryStringToFilter,
  parseQueryStringToFilters
} from 'utils/filters'

import * as S from './styles'

export type GamesProps = {
  filterSchemas: ItemProps[]
}

const Games = ({ filterSchemas }: GamesProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryObject = Object.fromEntries(searchParams.entries() ?? [])

  const filters = parseQueryStringToFilters({
    queryString: queryObject,
    filterSchemas
  })

  const sort = useMemo(() => {
    if (!queryObject?.sort) return undefined
    return [queryObject.sort]
  }, [queryObject?.sort])

  const {
    data: games,
    total: totalLength,
    error,
    loading,
    handleFetchMore
  } = useGames({
    limit: 15,
    filters: filters,
    sort: sort
  })

  const hasMoreGames = games?.length < (totalLength || 0)

  const handleFilter = (
    selectedFilter: Record<string, string | number | Array<string | number>>
  ) => {
    const newParams = new URLSearchParams()

    Object.entries(selectedFilter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => newParams.append(key, String(v)))
      } else {
        newParams.set(key, String(value))
      }
    })

    const query = newParams.toString()

    const url = query ? `${pathname}?${query}` : pathname
    router.push(url)
  }

  const initialValues = parseQueryStringToFilter({
    filterSchemas,
    queryString: queryObject
  })

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          items={filterSchemas}
          initialValues={initialValues}
          onFilter={handleFilter}
        />
        <section>
          {games?.length ? (
            <>
              <Grid>
                {games?.map((item, index) => (
                  <GameCard key={`game-${item.title}-${index}`} {...item} />
                ))}
              </Grid>
              {hasMoreGames && (
                <S.ShowMore>
                  {loading ? (
                    <S.ShowMoreLoading
                      src="/img/dots.svg"
                      alt="Loading more games..."
                    />
                  ) : (
                    <S.ShowMoreButton role="button" onClick={handleFetchMore}>
                      <p>Show More</p>
                      <ArrowDown size={35} />
                    </S.ShowMoreButton>
                  )}
                </S.ShowMore>
              )}
            </>
          ) : loading ? (
            <S.LoadingContainer data-testid="loading">
              <PacmanLoading />
            </S.LoadingContainer>
          ) : error ? (
            <Empty
              title="An error occurred while loading the games."
              description="Please try again later."
            />
          ) : (
            <Empty
              title=":("
              description="We didn't find any games with this filter"
              hasLink
            />
          )}
        </section>
      </S.Main>
    </Base>
  )
}

export default Games
