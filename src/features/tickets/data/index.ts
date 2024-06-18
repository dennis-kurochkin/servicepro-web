import { StatusEnum } from '~/api/servicepro.generated'

export enum TicketsTab {
  Active = 'active',
  History = 'history'
}

export const StatusEnumTitle: Record<StatusEnum, string> = {
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

export const TicketDescriptionFormStatuses = [
  StatusEnum.Processing,
  StatusEnum.Wait,
  StatusEnum.Approval,
]

export const TicketDescriptionFormResult = [
  StatusEnum.Approval,
  StatusEnum.Processing,
  StatusEnum.OnWay,
  StatusEnum.Wait,
  StatusEnum.Pause,
  StatusEnum.Search,
  StatusEnum.Work,
]
