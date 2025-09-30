import { graphql } from 'graphql/generated'

export const GET_GAMES = graphql(`
  query GetGames(
    $limit: Int!
    $start: Int
    $filters: GameFiltersInput
    $sort: [String]
  ) {
    games(
      pagination: { limit: $limit, start: $start }
      filters: $filters
      sort: $sort
    ) {
      name
      slug
      cover {
        url
      }

      developers {
        name
      }

      platforms {
        name
      }

      price
    }

    games_connection(filters: $filters) {
      pageInfo {
        total
      }
    }
  }
`)
