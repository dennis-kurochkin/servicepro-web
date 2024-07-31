import { Message } from '~/api/servicepro-chat.generated'
import { StatusEnum } from '~/api/servicepro.generated'

export enum WSMessagePayloadModel {
  NewMessage = 'NewMessage',
  UsedButton = 'UsedButton',
  RefreshTask = 'RefreshTask',
  NewTask = 'NewTask',
  RemoveTask = 'RemoveTask',
  ArchiveTask = 'ArchiveTask',
  Other = 'Other',
}

interface WSDataPayloadMessage {
  task_id: number
  message: Message
}

interface WSDataPayloadTaskData {
  task_id: number
  status: StatusEnum
  author_id: number
}

interface WSDataPayloadTaskId {
  task_id: number
}

export interface WSDataNewMessage {
  payload_model: WSMessagePayloadModel.NewMessage
  payload: WSDataPayloadMessage
}

export interface WSDataNewTask {
  payload_model: WSMessagePayloadModel.NewTask
  payload: WSDataPayloadTaskId
}

export interface WSDataUsedButton {
  payload_model: WSMessagePayloadModel.UsedButton
  payload: WSDataPayloadTaskData
}

export interface WSDataRefreshTask {
  payload_model: WSMessagePayloadModel.RefreshTask
  payload: WSDataPayloadTaskData
}

export interface WSDataRemoveTask {
  payload_model: WSMessagePayloadModel.RemoveTask
  payload: WSDataPayloadTaskId
}

export interface WSDataArchiveTask {
  payload_model: WSMessagePayloadModel.ArchiveTask
  payload: WSDataPayloadMessage
}

export interface WSDataOther {
  payload_model: WSMessagePayloadModel.Other
  payload: undefined
}

export type WSData = WSDataNewMessage | WSDataNewTask | WSDataUsedButton | WSDataRefreshTask | WSDataRemoveTask | WSDataArchiveTask | WSDataOther
