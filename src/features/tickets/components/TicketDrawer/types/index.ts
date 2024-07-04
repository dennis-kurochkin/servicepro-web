import { Message } from '~/api/servicepro-chat.generated'

export type WSData = {
  payload_model: 'NewMessage',
  payload: {
    task_id: number,
    message: Message
  }
} | {
  payload_model: 'Other',
  payload: undefined
} | {
  payload_model: 'NewTask',
  payload: {
    task_id: number
  }
} | {
  payload_model: 'UsedButton',
  payload: {
    task_id: number
  }
}
