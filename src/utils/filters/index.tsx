import { GetGamesQueryVariables } from 'graphql/generated/graphql'
import { ItemProps } from 'components/ExploreSidebar'

type ParseArgs = {
  queryString?: Record<string, string | number | string[]>
  filterSchemas: Pick<ItemProps, 'type' | 'name'>[]
}

type PriceFilter = {
  lte?: number
}

type InFilter = {
  name: {
    in: string[]
  }
}

type NormalizedFilters = {
  price?: PriceFilter
  platforms?: InFilter
  categories?: InFilter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

function normalizeFilters(
  obj: Record<string, string | number | Array<string>>
) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (key.includes('_')) {
      const [mainKey, subKey] = key.split('_')

      acc[mainKey] = {
        ...(acc[mainKey] as object),
        [subKey]: Number(value)
      }
    } else {
      acc[key] = value
    }

    return acc
  }, {} as NormalizedFilters)
}

export const parseQueryStringToFilters = ({
  queryString,
  filterSchemas
}: ParseArgs) => {
  if (!queryString || Object.keys(queryString).length === 0) return undefined

  const normalizedFilterParams = normalizeFilters(queryString)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterObject: Record<string, any> = {}

  Object.keys(normalizedFilterParams)
    .filter((item) => item !== 'sort')
    .forEach((key) => {
      const item = filterSchemas?.find((item) => item.name === key)
      const isCheckbox = item?.type === 'checkbox'

      filterObject[key] = !isCheckbox
        ? normalizedFilterParams[key]
        : key === 'categories'
          ? {
              slug: {
                in: normalizedFilterParams[key]
              }
            }
          : {
              name: {
                in: normalizedFilterParams[key]
              }
            }
    })

  return filterObject as GetGamesQueryVariables['filters']
}

export const parseQueryStringToFilter = ({
  queryString,
  filterSchemas
}: ParseArgs) => {
  if (!queryString) return undefined

  const obj: Record<string, string | number | (string | number)[]> = {}

  Object.keys(queryString).forEach((key) => {
    const item = filterSchemas?.find((item) => item.name === key)

    const value = queryString[key]

    if (value !== undefined && value !== null) {
      const isCheckbox = item?.type === 'checkbox'
      const isArray = Array.isArray(value)

      obj[key] = !isArray && isCheckbox ? [value] : value
    }
  })

  return obj
}
