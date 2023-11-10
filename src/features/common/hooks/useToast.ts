import { OptionsObject, useSnackbar } from 'notistack'

export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  return {
    enqueueSnackbar: (message: string, options: OptionsObject) => enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      ...options,
    }),
    closeSnackbar,
  }
}
