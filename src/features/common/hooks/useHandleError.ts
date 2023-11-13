import { useToast } from '@hooks/useToast'

export const useHandleError = () => {
  const { enqueueSnackbar } = useToast()

  return (error: unknown, fallbackMessage: string = 'Произошла ошибка') => {
    enqueueSnackbar(typeof error == 'string' ? error : fallbackMessage, { variant: 'error' })
  }
}
