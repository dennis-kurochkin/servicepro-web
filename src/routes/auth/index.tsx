import { useNavigate } from 'react-router-dom'
import logoVertical from '@assets/logo-vertical.png'
import { FieldInput } from '@components/Field'
import { theme } from '@data/theme'
import { Box, Button, Link } from '@mui/material'

export const AuthRoute = () => {
  const navigate = useNavigate()

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
        >
          <FieldInput
            value={''}
            name={'username'}
            label={'Логин'}
            placeholder={'Введите логин'}
          />
          <FieldInput
            value={''}
            type={'password'}
            name={'username'}
            label={'Пароль'}
            placeholder={'Введите пароль'}
            sx={{ mt: '16px' }}
          />
          <Button
            size={'large'}
            sx={{
              mt: '28px',
              width: '100%',
            }}
            variant={'contained'}
            onClick={() => navigate('/tickets')}
          >
            Войти в аккаунт
          </Button>
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
