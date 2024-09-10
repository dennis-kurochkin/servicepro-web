import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FieldInputControlled } from '@components/Field'
import { AuthFormWrapper } from '@features/auth/components/AuthFormWrapper'
import { rr } from '@features/ui/types'
import { useAuth } from '@hooks/useAuth'
import { useNotify } from '@hooks/useNotify'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Checkbox, FormControlLabel, InputAdornment, Link } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { publicClient } from '~/api'

export interface AuthFormData {
  username: string
  password: string
}

export const AuthRoute = () => {
  const navigate = useNavigate()
  // const location = useLocation() TODO
  // const from = location.state?.from?.pathname || '/' TODO
  const { notify } = useNotify()
  const { auth, setAuth, persist, setPersist } = useAuth()
  const [passwordVisible, setPasswordVisible] = useState(false)

  useEffect(() => {
    if (auth?.accessToken) {
      navigate('/', { replace: true })
    }
  }, [])

  const authMutation = useMutation({
    mutationKey: ['auth'],
    mutationFn: async (input: AuthFormData) => {
      try {
        const { data: { access } } = await rr(publicClient.api.accountJwtCreateCookieCreate)(input, { withCredentials: true })

        setAuth({
          user: input,
          accessToken: access,
        })

        localStorage.setItem('persist', JSON.stringify(persist))
        // TODO
        // navigate(from, { replace: true })
        navigate('/', { replace: true })
      } catch (error) {
        notify({
          message: 'Неверные логин или пароль',
          variant: 'error',
          preventDuplicate: true,
        })
      }
    },
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
    <AuthFormWrapper>
      <Box
        component={'form'}
        onSubmit={handleSubmit(handleAuth)}
      >
        <FieldInputControlled
          name={'username'}
          control={control}
          disabled={authMutation.isPending}
          label={'Логин'}
          rules={{ required: true }}
          placeholder={'Введите логин'}
          autoFocus
        />
        <FieldInputControlled
          name={'password'}
          control={control}
          disabled={authMutation.isPending}
          type={passwordVisible ? 'text' : 'password'}
          label={'Пароль'}
          rules={{ required: true }}
          placeholder={'Введите пароль'}
          sx={{ mt: '16px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position={'end'}
                sx={{ cursor: 'pointer' }}
                onClick={() => setPasswordVisible((value) => !value)}
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <FormControlLabel
            checked={persist}
            disabled={authMutation.isPending}
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
          loading={authMutation.isPending}
        >
          Войти в аккаунт
        </LoadingButton>
      </Box>
      <Link
        component={'button'}
        underline="hover"
        sx={{ mt: '16px', mx: 'auto', fontSize: '15px' }}
        onClick={() => navigate('/auth/recover')}
      >
        Восстановить пароль
      </Link>
    </AuthFormWrapper>
  )
}
