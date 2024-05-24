import { RoleEnum } from '~/api/servicepro.generated'

export enum QueryKey {
  TicketsGeos = 'tickets-geos',
  TicketsEngineers = 'tickets-engineers',
  Engineers = 'engineers',
  Clients = 'clients',
  Ticket = 'ticket',
  Chats = 'chats',
}

export const RoleLabel: Record<RoleEnum, string> = {
  [RoleEnum.Client]: 'Клиент',
  [RoleEnum.Coordinator]: 'Координатор',
  [RoleEnum.Engineer]: 'Инженер',
  [RoleEnum.Server]: 'Система',
}
