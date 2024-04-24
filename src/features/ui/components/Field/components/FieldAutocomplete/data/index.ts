import { INPUT_MAX_WIDTH } from '@components/Field/constants'
import { SxProps } from '@mui/material'

export const FieldAutocompleteSx = (sx: SxProps = {}, fluid: boolean) => ({
  ...sx,
  maxWidth: !fluid ? INPUT_MAX_WIDTH : undefined,
})
