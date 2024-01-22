import { useNotify } from '@hooks/useNotify'

export const useHandleError = () => {
  const { notify } = useNotify()

  return (error: unknown, fallbackMessage: string = 'Произошла ошибка') => {
    notify({
      message: typeof error == 'string' ? error : fallbackMessage,
      variant: 'error',
    })
  }
}
