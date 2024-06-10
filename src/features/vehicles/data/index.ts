import { ChipProps } from '@mui/material'
import { LevelEnum, SolutionEnum } from '~/api/servicepro.generated'

export const LevelEnumLabel: Record<LevelEnum, string> = {
  [LevelEnum.Critical]: 'Критично',
  [LevelEnum.Info]: 'Информация',
  [LevelEnum.Warning]: 'Предупреждение',
}

export const LevelEnumColor: Record<LevelEnum, ChipProps['color']> = {
  [LevelEnum.Critical]: 'primary',
  [LevelEnum.Info]: 'info',
  [LevelEnum.Warning]: 'warning',
}

export const SolutionEnumLabel: Record<SolutionEnum, string> = {
  [SolutionEnum.Complete]: 'Выполнена',
  [SolutionEnum.No]: 'Не выполнена',
}

export const SolutionEnumColor: Record<SolutionEnum, ChipProps['color']> = {
  [SolutionEnum.Complete]: 'success',
  [SolutionEnum.No]: 'warning',
}
