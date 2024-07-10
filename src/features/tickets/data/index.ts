import { FieldAutocompleteCommonValue } from '@components/Field/components/FieldAutocomplete/types'
import { StatusEnum } from '~/api/servicepro.generated'

export enum TicketsTab {
  Active = 'active',
  History = 'history'
}

export const StatusEnumLabel: Record<StatusEnum, string> = {
  [StatusEnum.Done]: 'Выполнено',
  [StatusEnum.Approval]: 'В обработке',
  [StatusEnum.Processing]: 'В обработке',
  [StatusEnum.OnWay]: 'В пути',
  [StatusEnum.Wait]: 'Ожидание ИСО',
  [StatusEnum.Pause]: 'Пауза',
  [StatusEnum.Search]: 'Поиск',
  [StatusEnum.Work]: 'ИСО приступил',
}

export enum TicketMessageAction {
  Applied = 'applied',
  Rejected = 'rejected',
  Apply = 'apply',
  Reject = 'reject',
}

export const TicketMessageActionLabel: Record<TicketMessageAction, string> = {
  [TicketMessageAction.Applied]: 'Принято',
  [TicketMessageAction.Rejected]: 'Отклонено',
  [TicketMessageAction.Apply]: 'Принять',
  [TicketMessageAction.Reject]: 'Отклонить',
}

export const ticketStatusesConditionsChange = [
  StatusEnum.Processing,
  StatusEnum.Approval,
]

export const ticketDescriptionFormResult = [
  StatusEnum.Approval,
  StatusEnum.Processing,
  StatusEnum.OnWay,
  StatusEnum.Wait,
  StatusEnum.Pause,
  StatusEnum.Search,
  StatusEnum.Work,
]

export const ticketStatusesEngineerEditable = Object.values(StatusEnum).filter((status) => status !== StatusEnum.Done)

export const TicketAvailableStatusesByStatus: Record<StatusEnum, StatusEnum[]> = {
  [StatusEnum.Search]: [],
  [StatusEnum.Processing]: [],
  [StatusEnum.Wait]: [],
  [StatusEnum.Approval]: [
    StatusEnum.OnWay,
    StatusEnum.Work,
    StatusEnum.Pause,
  ],
  [StatusEnum.OnWay]: [
    StatusEnum.Work,
    StatusEnum.Pause,
  ],
  [StatusEnum.Pause]: [
    StatusEnum.Work,
  ],
  [StatusEnum.Work]: [
    StatusEnum.Pause,
  ],
  [StatusEnum.Done]: [],
}

export type TicketMapUpdateTime = '1' | '3' | '5'

export const ticketMapUpdateTimeOptions: FieldAutocompleteCommonValue<TicketMapUpdateTime>[] = [
  {
    value: '1',
    label: '1 минута',
  },
  {
    value: '3',
    label: '3 минуты',
  },
  {
    value: '5',
    label: '5 минут',
  },
]
