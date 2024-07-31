import { useCallback, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { WSData, WSMessagePayloadModel } from '@features/tickets/components/TicketDrawer/types'
import { useApi } from '@hooks/useApi'
import { useEmployment } from '@hooks/useEmployment'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { queryClient } from '~/api'
import { Message } from '~/api/servicepro-chat.generated'
import { Profile, RoleEnum, WorkTaskDetailed } from '~/api/servicepro.generated'

export const useTicketDrawerWebSocket = (ticketID: number | null) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()
  const [authorization, setAuthorization] = useState('')

  const getSocketUrl = useCallback(async () => {
    const { data: tokenData } = await api.workSersChatTokensCreate(organizationID.toString(), { token: '' })
    setAuthorization(tokenData.token)
    return `wss://servicepro-chat.humanagro.ru/ws/ws-chat?authorization=${tokenData.token}`
  }, [api, organizationID])

  const socket = useWebSocket(getSocketUrl, {
    onMessage: async (event) => {
      const data = JSON.parse(event.data) as WSData

      if (data.payload?.task_id === ticketID) {
        switch (data.payload_model) {
          case WSMessagePayloadModel.NewMessage:
            queryClient.setQueryData([QueryKey.Chats, ticketID, organizationID], (oldData) => [
              data.payload.message,
              ...oldData as Message[],
            ])

            if (data.payload.message.status) {
              queryClient.setQueryData([QueryKey.Ticket, ticketID, organizationID], (oldData) => ({
                ...oldData as WorkTaskDetailed,
                status: data.payload.message.status,
              }))
            }

            if (data.payload.message.media_files?.length) {
              await queryClient.invalidateQueries({ queryKey: [QueryKey.TicketAttachments, ticketID, organizationID] })
            }

            break
          case WSMessagePayloadModel.UsedButton:
          case WSMessagePayloadModel.RefreshTask:
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket, ticketID, organizationID] }),
              queryClient.invalidateQueries({ queryKey: [QueryKey.TicketAttachments, ticketID, organizationID] }),
              queryClient.invalidateQueries({ queryKey: [QueryKey.TicketStatuses, ticketID] }),
              queryClient.invalidateQueries({ queryKey: [QueryKey.TicketResult, ticketID] }),
              queryClient.invalidateQueries({ queryKey: [QueryKey.Chats, ticketID, organizationID] }),
            ])
            break
          case WSMessagePayloadModel.ArchiveTask:
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket, ticketID, organizationID] }),
              queryClient.invalidateQueries({ queryKey: [QueryKey.TicketResult, ticketID] }),
              queryClient.invalidateQueries({ queryKey: [QueryKey.TicketReviews, ticketID, organizationID] }),
            ])
            break
          case WSMessagePayloadModel.RemoveTask:
            console.log('remove')
        }
      }

      if (data.payload_model === WSMessagePayloadModel.NewTask) {
        await queryClient.invalidateQueries({ queryKey: [QueryKey.TicketsGeos] })
      }
    },
  })

  return {
    authorization,
    socket,
  }
}

export const useTicketDrawerQuery = (ticketID: number | null, open: boolean) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()
  const { data: employment } = useEmployment()
  const [members, setMembers] = useState<{ [key: number]: { profile: Profile, role: RoleEnum } }>({})

  const query = useQuery({
    queryKey: [QueryKey.Ticket, ticketID, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersTasksRetrieve(ticketID!, organizationID.toString())

      if (employment?.id && (data?.coordinator?.id !== employment?.id)) {
        await api.workSersTasksExecutorsPartialUpdate(ticketID!, organizationID.toString(), {
          coordinator: employment?.id,
        })
      }

      setMembers({
        ...(data.executor?.id ? {
          [data.executor.id]: {
            profile: data.executor.profile,
            role: RoleEnum.Engineer,
          },
        } : {}),
        ...(data.coordinator?.id ? {
          [data.coordinator.id]: {
            profile: data.coordinator.profile,
            role: RoleEnum.Coordinator,
          },
        } : {}),
        ...(data.customer?.id ? {
          [data.customer.id]: {
            profile: data.customer.profile,
            role: RoleEnum.Client,
          },
        } : {}),
      })

      return data
    },
    refetchOnWindowFocus: false,
    enabled: open && !!employment,
  })

  return {
    ...query,
    members,
  }
}

export const useTicketDrawerQueryResult = (ticketID: number | null, open: boolean) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  return useQuery({
    queryKey: [QueryKey.TicketResult, ticketID, organizationID],
    queryFn: async () => {
      try {
        const { data } = await api.workSersTasksResultRetrieve(ticketID!, organizationID.toString())
        return data
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 404) {
          return null
        }

        throw error
      }
    },
    enabled: open && !!ticketID,
  })
}

export const useTicketDrawerQueryReviews = (ticketID: number | null, open: boolean) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  return useQuery({
    queryKey: [QueryKey.TicketReviews, ticketID, organizationID],
    queryFn: async () => {
      try {
        const { data } = await api.workSersTasksReviewsList({
          orgId: organizationID.toString(),
          taskId: ticketID!.toString(),
        })
        return data
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 404) {
          return null
        }

        throw error
      }
    },
    enabled: open && !!ticketID,
  })
}

export const useTicketDrawerQueryAttachments = (ticketID: number | null, open: boolean) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  return useQuery({
    queryKey: [QueryKey.TicketAttachments, ticketID, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersTasksAttachmentsList({
        orgId: organizationID.toString(),
        taskId: ticketID?.toString() ?? '',
      })

      return data
    },
    enabled: open && !!ticketID,
  })
}

export const useTicketDrawerQueryStatuses = (ticketID: number | null, open: boolean) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  return useQuery({
    queryKey: [QueryKey.TicketStatuses, ticketID, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersTasksStatusesList({
        orgId: organizationID.toString(),
        taskId: ticketID?.toString() ?? '',
      })

      return data
    },
    enabled: open && !!ticketID,
  })
}

export const useTicketDrawerQueryChats = (ticketID: number | null, authorization: string, readyState: ReadyState) => {
  const { organizationID } = useOrganizationID()
  const { chatApi } = useApi()

  return useQuery({
    queryKey: [QueryKey.Chats, ticketID, organizationID],
    queryFn: async () => {
      const { data } = await chatApi.getMessagesApiChatsTaskIdMessagesGet({
        taskId: ticketID!,
        authorization,
        offset: 0,
        limit: PAGINATION_DEFAULT_LIMIT,
      })

      return data
    },
    refetchOnWindowFocus: false,
    enabled: readyState === ReadyState.OPEN && !!ticketID,
  })
}
