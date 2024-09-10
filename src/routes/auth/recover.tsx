import { useForm } from 'react-hook-form'
import { FieldInputControlled } from '@components/Field'
import { AuthFormWrapper } from '@features/auth/components/AuthFormWrapper'
import { rr } from '@features/ui/types'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'

export interface AuthRecoverFormData {
  email: string
}

export const AuthRecoverRoute = () => {
  const { api } = useApi()
  const { notify } = useNotify()

  const { handleSubmit, control } = useForm<AuthRecoverFormData>({
    defaultValues: {
      email: '',
    },
  })

  const handleAuth = async (formData: AuthRecoverFormData) => {
    try {
      const { data } = await rr(api.accountActionsResetPasswordCreate)({
        username: formData.email,
      })

      console.log(data)
    } catch (error) {
      notify({
        message: 'Не удалось отправить ссылку на восстановления пароля',
      })
    }
  }

  return (
    <AuthFormWrapper>
      <Box
        component={'form'}
        onSubmit={handleSubmit(handleAuth)}
      >
        <FieldInputControlled
          name={'email'}
          control={control}
          disabled={false}
          label={'Эл. почта'}
          placeholder={'Введите электронную почту'}
          rules={{
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Введите корректную электронную почту',
            },
          }}
          autoFocus
        />
        <LoadingButton
          type={'submit'}
          size={'large'}
          sx={{
            mt: '24px',
            width: '100%',
          }}
          variant={'contained'}
          loading={false}
        >
          Отправить ссылку
        </LoadingButton>
      </Box>
    </AuthFormWrapper>
  )
}
