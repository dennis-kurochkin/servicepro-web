import { TicketMapUpdateTime, ticketMapUpdateTimeOptions } from '@features/tickets/data'
import { create } from 'zustand'

interface MapStoreState {
  updateTime: TicketMapUpdateTime
  setUpdateTime: (time: TicketMapUpdateTime) => void
  updatedNotification: boolean
  setUpdatedNotification: (value: boolean) => void
}

export const useMapStore = create<MapStoreState>((setState) => ({
  updateTime: ticketMapUpdateTimeOptions[2].value,
  setUpdateTime: (time: TicketMapUpdateTime) => setState({ updateTime: time }),
  updatedNotification: false,
  setUpdatedNotification: (value: boolean) => setState({ updatedNotification: value }),
}))
