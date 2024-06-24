import { FieldAutocompleteCommonValue } from '@components/Field/components/FieldAutocomplete/types'
import { StatusEnumTitle, TicketAvailableStatusesByStatus } from '@features/tickets/data'
import { StatusEnum } from '~/api/servicepro.generated'

export const getAvailableStatusOptions = (status: StatusEnum): FieldAutocompleteCommonValue[] => {
  return TicketAvailableStatusesByStatus[status].map((value) => ({
    value,
    label: StatusEnumTitle[value],
  }))
}
