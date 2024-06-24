import { ChipProps } from '@mui/material'
import { LevelEnum, SolutionEnum } from '~/api/servicepro.generated'

export const LevelEnumLabel: Record<LevelEnum, string> = {
  [LevelEnum.Critical]: 'Критический',
  [LevelEnum.Info]: 'Уведомление',
  [LevelEnum.Warning]: 'Обязательный',
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
