import { useNotify } from '@hooks/useNotify'
import { isAxiosError } from 'axios'

export type BackendError = {
  response?: {
    detail?: string
    code?: string
    messages?: {
      token_class?: string
      token_type?: string
      message?: string
    }[]
  }
}

export const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка'

export const useErrorAlert = () => {
  const { notify } = useNotify()

  return {
    alert: (error: unknown, fallbackMessage?: string) => {
      if (!isAxiosError(error)) {
        notify({
          message: DEFAULT_ERROR_MESSAGE,
          variant: 'error',
          preventDuplicate: true,
        })

        return
      }

      if (['401', '403'].some((value) => error.code === value)) {
        return
      }

      return error.response?.data
        ? `${fallbackMessage ?? DEFAULT_ERROR_MESSAGE}: ${error.response?.data?.detail}`
        : (fallbackMessage ?? DEFAULT_ERROR_MESSAGE)
    },
  }
}
