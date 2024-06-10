import { SolutionEnumColor, SolutionEnumLabel } from '@features/vehicles/data'
import { Chip } from '@mui/material'
import { SolutionEnum } from '~/api/servicepro.generated'

interface VehicleChipRecommendationSolutionProps {
  solution: SolutionEnum
}

export const VehicleChipRecommendationSolution = ({ solution }: VehicleChipRecommendationSolutionProps) => {
  return (
    <Chip
      variant={'outlined'}
      color={SolutionEnumColor[solution]}
      label={solution ? SolutionEnumLabel[solution] : 'Неизвестно'}
      size={'small'}
    />
  )
}
