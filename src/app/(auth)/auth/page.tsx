'use client'

import {Box, Button, Link, Typography} from "@mui/material";
import {useTheme} from "@mui/system";
import Image from "next/image";
import React from "react";
import {FieldInput} from "~/features/common/components/Field";
import {useRouter} from "next/navigation";

export default function Page() {
  const theme = useTheme()
  const router = useRouter()

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
        <Image
          src="/logo-vertical.png"
          alt="СЕРВИСПРО"
          style={{ display: 'block', }}
          width={165}
          height={192}
          priority
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
            sx={{ mt: '16px', }}
          />
          <Button
            size={'large'}
            sx={{
              mt: '28px',
              width: '100%',
            }}
            variant={'contained'}
            onClick={() => router.push('/tickets')}
          >
            Войти в аккаунт
          </Button>
          <Link
            component={'button'}
            underline="hover"
            sx={{ mt: '16px', fontSize: '15px' }}
            onClick={() => router.push('/auth/recover')}
          >
            Восстановить пароль
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
