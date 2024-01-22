import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import logoVertical from '@assets/logo-vertical.png'
import { FieldInputControlled } from '@components/Field'
import { theme } from '@data/theme'
import { rr } from '@features/common/types'
import { useAuth } from '@hooks/useAuth'
import { useNotify } from '@hooks/useNotify'
import { LoadingButton } from '@mui/lab'
import { Box, Link } from '@mui/material'
import { api, client } from '~/api'

export interface AuthFormData {
  username: string
  password: string
}

export const AuthRoute = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/tickets'
  const { notify } = useNotify()
  const { setAuth } = useAuth()

  const authMutation = useMutation(['auth'], async (input: AuthFormData) => {
    try {
      const { data: { access } } = await rr(api.accountJwtCreateCreate)(input)

      setAuth({
        user: input,
        accessToken: access,
      })

      client.instance.defaults.headers.common['Authorization'] = 'Bearer ' + access
      navigate(from, { replace: true })
    } catch (error) {
      notify({
        message: 'Неверные логин или пароль',
        variant: 'error',
        preventDuplicate: true,
      })
    }
  })

  const { handleSubmit, control } = useForm<AuthFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleAuth = (data: AuthFormData) => {
    authMutation.mutate(data)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: '-150px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={logoVertical}
          alt="СЕРВИСПРО"
          style={{ display: 'block' }}
          width={165}
          height={192}
        />
        <Box
          component={'form'}
          sx={{
            display: 'grid',
            width: '400px',
            borderRadius: 3,
            border: '1px solid',
            padding: '28px 28px 28px',
            mt: '32px',
            borderColor: theme.palette.grey['200'],
            background: theme.palette.common.white,
          }}
          onSubmit={handleSubmit(handleAuth)}
        >
          <FieldInputControlled
            name={'username'}
            control={control}
            disabled={authMutation.isLoading}
            label={'Логин'}
            rules={{ required: true }}
            placeholder={'Введите логин'}
            autoFocus
          />
          <FieldInputControlled
            name={'password'}
            control={control}
            disabled={authMutation.isLoading}
            type={'password'}
            label={'Пароль'}
            rules={{ required: true }}
            placeholder={'Введите пароль'}
            sx={{ mt: '16px' }}
          />
          <LoadingButton
            type={'submit'}
            size={'large'}
            sx={{
              mt: '28px',
              width: '100%',
            }}
            variant={'contained'}
            loading={authMutation.isLoading}
          >
            Войти в аккаунт
          </LoadingButton>
          <Link
            component={'button'}
            underline="hover"
            sx={{ mt: '16px', fontSize: '15px' }}
            onClick={() => navigate('/auth/recover')}
          >
            Восстановить пароль
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
