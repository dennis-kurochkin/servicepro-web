import { RoleEnum } from '~/api/servicepro.generated'

export interface LabelValue<Label extends string | number = string, Value extends string | number = string> {
  label: Label
  value: Value
}

export type EmployeeProfile = {
  id: number
  name: string
  role: RoleEnum
  photo?: string
}
