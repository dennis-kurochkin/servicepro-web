import { HTMLAttributes } from 'react'
import { FieldAutocompleteCommonValue } from '@components/Field/components/FieldAutocomplete/types'

interface FieldAutocompleteOptionProps<T extends FieldAutocompleteCommonValue> {
  HTMLLIElementProps: HTMLAttributes<HTMLLIElement>
  option: T
}

export const FieldAutocompleteOption = <T extends FieldAutocompleteCommonValue, >({ HTMLLIElementProps, option }: FieldAutocompleteOptionProps<T>) => {
  return (
    <li {...HTMLLIElementProps}>
      <span>
        {option.label}
      </span>
    </li>
  )
}
