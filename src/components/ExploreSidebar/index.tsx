'use client'

import { useEffect, useState } from 'react'
import xor from 'lodash/xor'
import { Close, FilterList } from '@styled-icons/material-outlined'

import Radio from 'components/Radio'
import Button from 'components/Button'
import Heading from 'components/Heading'
import Checkbox from 'components/Checkbox'

import * as S from './styles'

type Field = {
  label: string
  name: string
}

type Values = {
  [field: string]: number | string | (string | number)[]
}

export type ItemProps = {
  name: string
  type: 'checkbox' | 'radio'
  title: string
  fields: Field[]
}

export type ExploreSidebarProps = {
  items: ItemProps[]
  initialValues?: Values
  onFilter?: (values: Values) => void
}

const ExploreSidebar = ({
  items,
  initialValues = {},
  onFilter
}: ExploreSidebarProps) => {
  const [values, setValues] = useState<Values>(initialValues)
  const [isOpen, setIsOpen] = useState(false)

  const handleRadio = (name: string, value: string | number) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value }))
  }

  const handleCheckbox = (name: string, value: string) => {
    const currentList = (values[name] as []) || []
    setValues((oldValues) => ({
      ...oldValues,
      [name]: xor(currentList, [value])
    }))
  }

  const handleFilterMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    onFilter?.(values)
    // this method comes another template
    // that we don't have access
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Overlay aria-hidden={!isOpen} isOpen={isOpen} />

      <S.IconWrapper>
        <FilterList aria-label="open filters" onClick={() => setIsOpen(true)} />
        <Close aria-label="close filters" onClick={() => setIsOpen(false)} />
      </S.IconWrapper>

      <S.Content>
        {items.map((item) => (
          <S.Items key={item.title}>
            <Heading lineBottom lineColor="secondary" size="small">
              {item.title}
            </Heading>

            {item.type === 'checkbox' &&
              item.fields.map((field) => (
                <Checkbox
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  labelFor={field.name}
                  isChecked={(values[item.name] as string[])?.includes(
                    field.name
                  )}
                  onCheck={() => handleCheckbox(item.name, field.name)}
                />
              ))}

            {item.type === 'radio' &&
              item.fields.map((field) => (
                <Radio
                  id={field.name}
                  key={field.name}
                  name={item.name}
                  value={field.name}
                  label={field.label}
                  labelFor={field.name}
                  defaultChecked={
                    String(field.name) === String(values[item.name])
                  }
                  onChange={() => handleRadio(item.name, field.name)}
                />
              ))}
          </S.Items>
        ))}
      </S.Content>

      <S.Footer>
        <Button fullWidth size="medium" onClick={handleFilterMenu}>
          Filter
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default ExploreSidebar
