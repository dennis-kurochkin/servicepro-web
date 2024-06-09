export interface LabelValue<Label extends string | number = string, Value extends string | number = string> {
  label: Label
  value: Value
}
