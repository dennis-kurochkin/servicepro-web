import { ButtonContextActions } from '@components/ButtonContextActions'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { Add, NearMeOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, TableCell, TableRow, TableSortLabel } from '@mui/material'
import { WorkEmployee } from '~/api/servicepro.generated'

export interface EngineerRow {
  data: WorkEmployee
}

export const EngineerRow = ({ data }: EngineerRow) => {
  console.log(data)
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        size={'small'}
      >
        {data.id}
      </TableCell>
      <TableCell>
        <EngineerAvatar
          profile={data.profile}
        />
      </TableCell>
      <TableCell>
        Агротехник 13:00 05.06.2023
        <TableSortLabel
          direction={'desc'}
          sx={{ marginLeft: '4px' }}
          active
        />
        <IconButton
          size={'small'}
          color={'info'}
          sx={{ marginLeft: '4px' }}
        >
          <Add fontSize={'small'} />
        </IconButton>
      </TableCell>
      <TableCell>
        <ChipStatus />
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
            sx={{
              width: 'auto',
              minWidth: '0',
              '& .MuiButton-startIcon': {
                marginRight: 0,
              },
            }}
            startIcon={<NearMeOutlined />}
          />
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
