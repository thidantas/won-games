import { ItemProps } from '@/components/ExploreSidebar'
import { parseQueryStringToFilters, parseQueryStringToFilter } from '.'

const filterItems: Pick<ItemProps, 'type' | 'name'>[] = [
  { name: 'price_lte', type: 'radio' },
  { name: 'platforms', type: 'checkbox' },
  { name: 'developers', type: 'checkbox' },
  { name: 'sort', type: 'radio' }
]

const queryString = {
  price_lte: '100',
  platforms: ['windows', 'linux'],
  developers: 'Rockstar Games',
  sort: 'price:desc'
}

describe('parsedQueryStringToFilters', () => {
  it('should parse queryString to filters format', () => {
    const parsedQuery = parseQueryStringToFilters({
      queryString,
      filterSchemas: filterItems
    })

    expect(parsedQuery).toStrictEqual({
      price: {
        lte: 100
      },
      platforms: {
        name: {
          in: ['windows', 'linux']
        }
      },
      developers: {
        name: {
          in: 'Rockstar Games'
        }
      }
    })
  })

  it('should parse queryString to filters values format', () => {
    const parsedQuery = parseQueryStringToFilter({
      queryString,
      filterSchemas: filterItems
    })

    expect(parsedQuery).toStrictEqual({
      price_lte: '100',
      platforms: ['windows', 'linux'],
      developers: ['Rockstar Games'],
      sort: 'price:desc'
    })
  })
})
