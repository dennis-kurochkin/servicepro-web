import { useTranslation } from 'react-i18next'
import { useToast } from 'hooks/useToast'

export const useHandleError = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useToast()

  return (error: unknown, fallbackMessage: string = t('common.unknownError')) => {
    enqueueSnackbar(typeof error == 'string' ? error : fallbackMessage, { variant: 'error' })
  }
}
