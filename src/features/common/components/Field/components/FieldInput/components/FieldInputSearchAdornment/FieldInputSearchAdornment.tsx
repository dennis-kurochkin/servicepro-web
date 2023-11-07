import * as React from 'react'
import { Search } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'

export const FieldInputSearchAdornment = () => {
  return (
    <InputAdornment position="end">
      <Search />
    </InputAdornment>
  )
}
