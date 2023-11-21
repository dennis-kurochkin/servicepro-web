import { HTMLAttributes } from 'react'
import { FieldAutocompleteCommonValue } from '@components/Field/components/FieldAutocomplete/types'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

interface FieldAutocompleteOptionProps<T extends FieldAutocompleteCommonValue> {
  HTMLLIElementProps: HTMLAttributes<HTMLLIElement>
  option: T
}

export const FieldAutocompleteOption = <T extends FieldAutocompleteCommonValue, >({ HTMLLIElementProps, option }: FieldAutocompleteOptionProps<T>) => {
  return (
    <li {...HTMLLIElementProps}>
      <span>
        {option.name}{' '}
        {!!option.id && (
          <Typography
            component={'span'}
            color={grey['600']}
          >
            (ID-{option.id})
          </Typography>
        )}
      </span>
    </li>
  )
}
