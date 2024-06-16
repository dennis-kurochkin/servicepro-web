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
}
