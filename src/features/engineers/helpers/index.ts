export const getEngineerLabel = ({ last_name, first_name }: { last_name?: string; middle_name?: string; first_name?: string }, forceSpacing = true) => {
  if (!last_name && !first_name) {
    return 'Без имени'
  }

  const spaceSymbol = forceSpacing ? '\u00A0' : ' '

  return `${last_name}${spaceSymbol}${first_name ? `${first_name[0].toUpperCase()}.${spaceSymbol}` : ''}`
}
