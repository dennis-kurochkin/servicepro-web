import { SolutionEnumColor, SolutionEnumLabel } from '@features/vehicles/data'
import { Chip } from '@mui/material'
import { SolutionEnum } from '~/api/servicepro.generated'

interface VehicleChipRecommendationSolutionProps {
  solution: SolutionEnum
}

export const VehicleChipRecommendationSolution = ({ solution }: VehicleChipRecommendationSolutionProps) => {
  return solution === SolutionEnum.Complete ? (
    <Chip
      variant={'filled'}
      color={SolutionEnumColor[solution]}
      label={solution ? SolutionEnumLabel[solution] : 'Неизвестно'}
      size={'small'}
    />
  ) : null
}
