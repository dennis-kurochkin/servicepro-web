import { useCallback, useEffect, useState } from 'react'
import { Dropzone } from '@components/Dropzone'
import { FieldInput } from '@components/Field'
import { SYMBOL_DIVIDER_DOT } from '@constants/index'
import { getEmployeeFullName } from '@features/engineers/helpers'
import { QueryKey } from '@features/shared/data'
import { useEmployment } from '@features/shared/hooks/useEmployment'
import { toBase64 } from '@helpers/index'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { usePageTitle } from '@hooks/usePageTitle'
import { Edit, Person } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import { queryClient } from '~/api'

export const ProfileRoute = () => {
  usePageTitle('Профиль')

  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const { notify } = useNotify()
  const { employment } = useEmployment()

  const [files, setFiles] = useState<File[]>([])
  const [avatar, setAvatar] = useState<string | null>(null)
  const [phone, setPhone] = useState<string>('')
  const [telegram, setTelegram] = useState<string>('')
  const [whatsapp, setWhatsapp] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const [, setDirty] = useState(false)

  useEffect(() => {
    setPhone(employment?.profile?.phone_number ?? '')
    setTelegram(employment?.profile?.telegram ?? '')
    setWhatsapp(employment?.profile?.whatsapp ?? '')
  }, [employment])

  const handleChangeAvatar = useCallback(async (files: File[]) => {
    if (loading) {
      return
    }

    try {
      setFiles(files)
      setLoading(true)

      if (files[0]) {
        const avatar = await toBase64(files[0])
        setAvatar(avatar)
      }
    } catch (error) {
      //
    } finally {
      setLoading(false)
    }
  }, [loading])

  const editProfile = useCallback(async () => {
    setDirty(true)

    try {
      setLoading(true)

      await api.orgOrgsMyProfilePartialUpdate(organizationID.toString(), {
        photo: avatar ?? undefined,
        phone_number: phone,
        telegram,
        whatsapp,
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.Profile] })

      setFiles([])
      setAvatar(null)
      setDirty(false)

      notify({
        variant: 'success',
        message: 'Профиль успешно обновлен',
      })
    } catch (error) {
      notify({
        variant: 'error',
        message: 'Не удалось изменить данные профиля',
      })
    } finally {
      setLoading(false)
    }
  }, [api, avatar, notify, organizationID, phone, telegram, whatsapp])

  return (
    <div>
      <Typography
        variant={'h5'}
      >
        {employment?.profile ? getEmployeeFullName(employment.profile) : 'Профиль'}
        <Typography
          component={'span'}
          variant={'h5'}
          fontWeight={400}
          sx={{ color: (theme) => theme.palette.grey['600'] }}
        >
          {` ${SYMBOL_DIVIDER_DOT} `}
          {employment?.profile?.position}
        </Typography>
      </Typography>
      <Typography
        variant={'h6'}
        fontWeight={400}
        sx={{ color: (theme) => theme.palette.grey['600'] }}
      >
        {employment?.profile?.email}
      </Typography>
      <Dropzone
        files={files}
        format={'photo'}
        touched={false}
        maxFiles={1}
        content={(open) => (
          <Box
            sx={{
              width: '800px',
              padding: '20px',
              marginTop: '20px',
              borderRadius: 1,
              background: (theme) => theme.palette.grey['200'],
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                alignItems: 'start',
                gap: '24px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <Avatar
                  id={'account-menu-avatar'}
                  src={avatar ?? employment?.profile?.photo ?? undefined}
                  sx={{
                    width: '200px',
                    height: '200px',
                    boxShadow: 1,
                  }}
                >
                  <Person sx={{ fontSize: '20px' }} />
                </Avatar>
                <Button
                  variant={'outlined'}
                  size={'small'}
                  color={'info'}
                  startIcon={<Edit />}
                  disabled={loading}
                  onClick={open}
                >
                  Изменить
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gap: '12px',
                }}
              >
                <FieldInput
                  value={phone}
                  name={'phone'}
                  label={'Телефон'}
                  placeholder={'Введите номер телефона'}
                  disabled={loading}
                  onChange={(event) => setPhone(event.target.value)}
                />
                <FieldInput
                  value={telegram}
                  name={'telegram'}
                  label={'Telegram'}
                  placeholder={'Введите логин'}
                  disabled={loading}
                  onChange={(event) => setTelegram(event.target.value)}
                />
                <FieldInput
                  value={whatsapp}
                  name={'whatsapp'}
                  label={'WhatsApp'}
                  placeholder={'Введите номер телефона'}
                  disabled={loading}
                  onChange={(event) => setWhatsapp(event.target.value)}
                />
              </Box>
            </Box>
            <Divider
              sx={{
                margin: '20px -20px 16px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <LoadingButton
                variant={'contained'}
                color={'info'}
                loading={loading}
                disableElevation
                onClick={editProfile}
              >
                Сохранить
              </LoadingButton>
            </Box>
          </Box>
        )}
        onChange={handleChangeAvatar}
      />
    </div>
  )
}
