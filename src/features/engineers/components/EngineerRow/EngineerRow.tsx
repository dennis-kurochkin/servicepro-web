import { ButtonContextActions } from '@components/ButtonContextActions'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { theme } from '@data/theme'
import { LibraryAddOutlined, NearMeOutlined } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Chip, TableCell, TableRow, Typography } from '@mui/material'

export const EngineerRow = () => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        size={'small'}
      >
        351
      </TableCell>
      <TableCell>
        <Typography
          variant={'body2'}
        >
          Петров И.А.{' '}
          <Typography
            component={'span'}
            variant={'body2'}
            fontWeight={700}
            color={theme.palette.success.main}
          >
            (4.3)
          </Typography>
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          size={'small'}
          label="ИСО приступил"
          color="warning"
          variant="filled"
        />
      </TableCell>
      <TableCell
        align={'right'}
        sx={{
          paddingRight: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          <Button
            size={'small'}
            variant="outlined"
            color={'info'}
            startIcon={<NearMeOutlined />}
          >
            На карте
          </Button>
          <ButtonGroup
            variant="outlined"
            color={'info'}
            disableElevation
          >
            <Button
              size={'small'}
              startIcon={<LibraryAddOutlined />}
            >
              Назначить заявку
            </Button>
            <Button
              size={'small'}
            >
              Все заявки
            </Button>
          </ButtonGroup>
        </Box>
      </TableCell>
      <TableCell
        sx={{ paddingRight: TABLE_CELL_DENSE_PADDING }}
      >
        <ButtonContextActions
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </TableCell>
    </TableRow>
  )
}
