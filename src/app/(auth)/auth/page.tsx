'use client'

import {Box, Button, Typography} from "@mui/material";
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
            gap: '16px',
            width: '400px',
            borderRadius: 2,
            border: '1px solid',
            padding: '32px 24px 36px',
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
          />
          <Button
            size={'large'}
            sx={{
              mt: '8px',
              width: '100%',
            }}
            variant={'contained'}
            onClick={() => router.push('/tickets')}
          >
            Войти в аккаунт
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
