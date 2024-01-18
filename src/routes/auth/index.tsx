import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import logoVertical from '@assets/logo-vertical.png'
import { FieldInputControlled } from '@components/Field'
import { theme } from '@data/theme'
import { LoadingButton } from '@mui/lab'
import { Box, Link } from '@mui/material'
import { client } from '~/api'

export interface AuthFormData {
  username: string
  password: string
}

export const AuthRoute = () => {
  const navigate = useNavigate()

  const mutation = useMutation(['auth'], async (input: AuthFormData) => {
    try {
      const { data } = await client.accountJwtCreateCreate(input)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  })

  const { handleSubmit, control } = useForm<AuthFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleAuth = (data: AuthFormData) => {
    mutation.mutate(data)
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
            label={'Логин'}
            rules={{ required: true }}
            placeholder={'Введите логин'}
          />
          <FieldInputControlled
            name={'password'}
            control={control}
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
            loading={mutation.isLoading}
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
