import { OptionsWithExtraProps, SnackbarMessage, useSnackbar, VariantType } from 'notistack'

export const useNotify = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  return {
    notify: (options: OptionsWithExtraProps<VariantType> & { message?: SnackbarMessage }) => enqueueSnackbar({
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      ...options,
    }),
    closeNotifications: closeSnackbar,
  }
}
