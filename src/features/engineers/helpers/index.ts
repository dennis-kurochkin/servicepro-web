export const getEngineerLabel = ({ last_name, first_name }: { last_name?: string; middle_name?: string; first_name?: string }) => {
  if (!last_name && !first_name) {
    return 'Без имени'
  }

  return `
    ${last_name}\u00A0
    ${first_name ? `${first_name[0].toUpperCase()}.\u00A0` : ''}
  `
}
