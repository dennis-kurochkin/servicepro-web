import { useEffect } from 'react'
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
import { Box, Checkbox, FormControlLabel, Link } from '@mui/material'
import { publicClient } from '~/api'

export interface AuthFormData {
  username: string
  password: string
}

export const AuthRoute = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/organization'
  const { notify } = useNotify()
  const { auth, setAuth, persist, setPersist } = useAuth()

  useEffect(() => {
    if (auth?.accessToken) {
      navigate('/tickets', { replace: true })
    }
  }, [])

  const authMutation = useMutation(['auth'], async (input: AuthFormData) => {
    try {
      const { data: { access } } = await rr(publicClient.api.accountJwtCreateCookieCreate)(input, { withCredentials: true })

      setAuth({
        user: input,
        accessToken: access,
      })

      localStorage.setItem('persist', JSON.stringify(persist))
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
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '24px',
        paddingBottom: '150px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
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
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <FormControlLabel
              checked={persist}
              disabled={authMutation.isLoading}
              label="Запомнить меня"
              sx={{
                mt: '8px',
                mb: '-8px',
                marginLeft: '-7px',
              }}
              componentsProps={{
                typography: {
                  fontSize: '14px',
                  paddingTop: '1px',
                },
              }}
              control={(
                <Checkbox
                  size={'small'}
                  sx={{
                    padding: '6px',
                  }}
                />
              )}
              onChange={() => setPersist(!persist)}
            />
          </Box>
          <LoadingButton
            type={'submit'}
            size={'large'}
            sx={{
              mt: '24px',
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
