import { StatusEnum } from '~/api/servicepro.generated'

export enum TicketsTab {
  Active = 'active',
  History = 'history'
}

export const StatusEnumTitle: Record<StatusEnum, string> = {
  [StatusEnum.Done]: 'Выполнено',
  [StatusEnum.Approval]: 'Ждет подтверждения',
  [StatusEnum.OnWay]: 'В пути',
  [StatusEnum.Wait]: 'Ожидание ИСО',
  [StatusEnum.Pause]: 'Пауза',
  [StatusEnum.Search]: 'Поиск',
  [StatusEnum.Work]: 'ИСО приступил',
  [StatusEnum.Processing]: 'В обработке',
}
