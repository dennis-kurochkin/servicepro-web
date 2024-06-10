import { LevelEnumColor, LevelEnumLabel } from '@features/vehicles/data'
import { Chip } from '@mui/material'
import { LevelEnum } from '~/api/servicepro.generated'

interface VehicleChipRecommendationLevelProps {
  level: LevelEnum
}

export const VehicleChipRecommendationLevel = ({ level }: VehicleChipRecommendationLevelProps) => {
  return (
    <Chip
      variant={'filled'}
      color={LevelEnumColor[level]}
      label={level ? LevelEnumLabel[level] : 'Неизвестно'}
      size={'small'}
    />
  )
}
