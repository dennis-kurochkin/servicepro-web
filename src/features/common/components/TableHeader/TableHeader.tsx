import { PropsWithChildren } from 'react'
import { ButtonIconSquare } from '@components/ButtonIconSquare'
import { FieldInput } from '@components/Field'
import { FilterAltTwoTone, Search } from '@mui/icons-material'
import { Badge, Box, InputAdornment, SxProps, Typography } from '@mui/material'

export interface TableHeaderProps {
  amount?: number
  sx?: SxProps
}

export const TableHeader = ({ amount, sx = {}, children }: PropsWithChildren<TableHeaderProps>) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        ...sx,
      }}
    >
      {typeof amount === 'number' ? (
        <Badge
          color={'primary'}
          badgeContent={amount}
          overlap={'rectangular'}
          sx={{
            marginRight: 'auto',
            '& > .MuiBadge-badge': {
              top: '4px',
              right: '-4px',
            },
          }}
        >
          <Typography
            variant={'h5'}
          >
            {children}
          </Typography>
        </Badge>
      ) : (
        <Typography
          variant={'h5'}
          sx={{
            marginRight: 'auto',
          }}
        >
          {children}
        </Typography>
      )}
      <form id={'table-header'}>
        <FieldInput
          value={''}
          name={'search'}
          placeholder={'Поиск'}
          sx={{ width: '260px' }}
          autoComplete={'off'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Badge
        variant={'dot'}
        color={'info'}
        overlap={'rectangular'}
        sx={{
          '& > .MuiBadge-badge': {
            height: '12px',
            width: '12px',
            borderRadius: '6px',
          },
        }}
      >
        <ButtonIconSquare
          onClick={() => {}}
        >
          <FilterAltTwoTone fontSize={'medium'} />
        </ButtonIconSquare>
      </Badge>
    </Box>
  )
}
