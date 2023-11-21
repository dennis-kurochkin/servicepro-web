import { theme } from '@data/theme'
import { AutocompleteRenderInputParams, CircularProgress } from '@mui/material'

export const FieldAutocompleteInputProps = (params: AutocompleteRenderInputParams, isLoading: boolean) => ({
  ...params.InputProps,
  endAdornment: (
    <>
      {isLoading && (
        <CircularProgress
          sx={{ color: theme.palette.primary.main }}
          size={20}
        />
      )}
      {params.InputProps.endAdornment}
    </>
  ),
})
