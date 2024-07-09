import { theme } from '@data/theme'
import { MAP_ACTIONS_Z_INDEX } from '@features/ui/constants'
import { Paper } from '@mui/material'

interface MapAddressSearchProps {
  onSelect: (address: never | null) => void
}

// @ts-expect-error dsfsdf
export const MapAddressSearch = ({ onSelect }: MapAddressSearchProps) => {
  // const [debouncedSearch, setDebouncedSearch] = useDebounce('', 300)
  // const query = useQuery(
  //   ['map', 'address-search', debouncedSearch],
  //   () => {}
  // )

  return (
    <Paper
      elevation={1}
      sx={{
        position: 'absolute',
        left: '56px',
        top: '12px',
        width: '300px',
        zIndex: MAP_ACTIONS_Z_INDEX,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/*<FieldAutocomplete*/}
      {/*  name={'addressSearch'}*/}
      {/*  value={null}*/}
      {/*  options={query.data?.map?.((address) => ({*/}
      {/*    name: address.display_name,*/}
      {/*    id: address.place_id,*/}
      {/*  })) ?? []}*/}
      {/*  placeholder={'Поиск по адресу'}*/}
      {/*  onChange={(value) => onSelect(query.data?.find(({ place_id }) => value?.id === place_id) ?? null)}*/}
      {/*  onInputChange={setDebouncedSearch}*/}
      {/*/>*/}
    </Paper>
  )
}
