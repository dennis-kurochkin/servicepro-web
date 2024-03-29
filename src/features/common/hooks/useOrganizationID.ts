import { useParams } from 'react-router-dom'

export const useOrganizationID = () => {
  const { organizationID } = useParams()

  if (!organizationID) {
    throw new Error('Param organizationID is undefined. You might me calling this hook from the homepage, which should not be done.')
  }

  return {
    organizationID: +organizationID,
  }
}
