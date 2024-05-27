import { ReactNode, useMemo, useState } from 'react'
import { DialogPhotoSlider } from '@components/DialogPhotoSlider'
import { useDialogPhotoSliderUtils } from '@components/DialogPhotoSlider/hooks/useDialogPhotoSliderUtils'
import { DATE_FORMAT_DEFAULT, DATE_FORMAT_TIME_DAY } from '@constants/index'
import { theme } from '@data/theme'
import { getEngineerLabel } from '@features/engineers/helpers'
import { TicketChipStatus } from '@features/shared/components/TicketChipStatus/TicketChipStatus'
import { QueryKey, RoleLabel } from '@features/shared/data'
import { TICKET_CHAT_OFFSET_LEFT } from '@features/tickets/constants'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { DisplaySettings, Person } from '@mui/icons-material'
import { Avatar, Box, Card, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { RoleEnum, StatusEnum } from '~/api/servicepro.generated'

type TicketChatMessageAuthor = {
  id: number
  name: string
  role: RoleEnum
  photo?: string
}

export interface TicketChatMessageProps {
  author: null | number | TicketChatMessageAuthor
  content: ReactNode | string
  pictures?: string[]
  status?: StatusEnum
  date: string
  actions?: ReactNode
}

export const TicketChatMessage = ({ author, content, pictures, status, date, actions }: TicketChatMessageProps) => {
  const { setCurrentPictureIndex } = useDialogPhotoSliderUtils()
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const [isDialogPhotoSliderOpen, setDialogPhotoSliderOpen] = useState(false)

  const { data: profile } = useQuery({
    queryKey: [QueryKey.Employee, typeof author === 'number' ? author : -1],
    queryFn: async (): Promise<TicketChatMessageAuthor> => {
      if (typeof author !== 'number') {
        return {
          id: -1,
          name: 'Система',
          role: RoleEnum.Server,
        }
      }

      const { data } = await api.workSersEmployeesRetrieve(author, organizationID.toString())

      return {
        id: data.id,
        name: getEngineerLabel(data.profile),
        role: data.role,
        photo: data.profile.photo ?? undefined,
      }
    },
    enabled: typeof author === 'number',
  })

  const authorProfile = useMemo(() => typeof author === 'number' ? (profile ?? {
    id: -1,
    name: 'Система',
    role: RoleEnum.Server,
  }) : author, [profile, author])

  const handleCloseDialogPhotoSlider = () => {
    setDialogPhotoSliderOpen(false)
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: author ? '116px 130px 1fr' : '116px 1fr',
          alignItems: 'start',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '44px',
            left: `${TICKET_CHAT_OFFSET_LEFT - 4}px`,
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: (theme) => theme.palette.grey['400'],
          }}
        />
        <Typography
          variant={'body2'}
          color={(theme) => theme.palette.grey['600']}
          sx={{
            marginTop: '32px',
            fontSize: '12px',
            wordSpacing: '4px',
          }}
        >
          {format(new Date(date), DATE_FORMAT_DEFAULT)}
          <br/>
          {format(new Date(date), DATE_FORMAT_TIME_DAY, { locale: ru })}
        </Typography>
        {author && (
          <Box
            sx={{
              marginTop: '36px',
            }}
          >
            <TicketChipStatus
              status={status}
              size={300}
              filled
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'grid',
            gap: '8px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {author && (
              <Avatar
                sx={{
                  width: '24px',
                  height: '24px',
                }}
                src={authorProfile?.photo}
                alt={authorProfile?.name ?? 'Система'}
              >
                {!authorProfile ? <DisplaySettings fontSize={'small'} /> : <Person fontSize={'small'} />}
              </Avatar>
            )}
            <Typography
              variant={'body2'}
            >
              {author && (
                <>
                  {authorProfile?.name ?? 'Система'}{' '}
                </>
              )}
              <Box
                component={'span'}
                sx={{
                  color: (theme) => theme.palette.grey['700'],
                }}
              >
                {authorProfile ? (
                  <>
                    {`  •  ${RoleLabel[authorProfile.role]}`}
                  </>
                ) : 'Описание задачи'}
              </Box>
            </Typography>
          </Box>
          <Card
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'visible',
              background: theme.palette.background.paper,
              padding: '8px 16px 12px 12px',
              borderRadius: author ? '8px 8px 8px 0' : '8px',
            }}
          >
            {author && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '-10px',
                  bottom: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 0 10px 10px',
                  borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
                  transform: 'rotate(0deg)',
                }}
              />
            )}
            <Typography variant={'body2'}>
              {content ? content : (
                <Box
                  component={'span'}
                  sx={{ color: (theme) => theme.palette.grey['700'] }}
                >
                  Текст отсутствует
                </Box>
              )}
            </Typography>
          </Card>
          {pictures && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
              }}
            >
              {pictures.map((picture, index) => (
                <Box
                  key={index}
                  sx={{
                    aspectRatio: 1,
                    backgroundColor: (theme) => theme.palette.grey['700'],
                    backgroundImage: `url(${picture})`,
                    backgroundSize: 'cover',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setCurrentPictureIndex(index)
                    setDialogPhotoSliderOpen(true)
                  }}
                />
              ))}
            </Box>
          )}
          {actions && (
            <Box
              sx={{
                display: 'grid',
                gap: '8px',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              {actions}
            </Box>
          )}
        </Box>
      </Box>
      {!!pictures?.length && (
        <DialogPhotoSlider
          open={isDialogPhotoSliderOpen}
          images={pictures}
          onClose={handleCloseDialogPhotoSlider}
        />
      )}
    </>
  )
}
