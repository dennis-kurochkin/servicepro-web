import { ButtonContextActions } from '@components/ButtonContextActions'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { LibraryAddOutlined } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Chip, Stack, TableCell, TableRow, Typography } from '@mui/material'

export const ClientRow = () => {
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
          Агротехник
        </Typography>
      </TableCell>
      <TableCell>
        г. Краснодар, ул. Тестовская, с. 311
      </TableCell>
      <TableCell align={'center'}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent={'center'}
        >
          <Chip
            size={'small'}
            label="3"
            color="primary"
          />
          <Chip
            size={'small'}
            label="13"
            color="warning"
          />
          <Chip
            size={'small'}
            label="2"
            color="info"
          />
        </Stack>
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
