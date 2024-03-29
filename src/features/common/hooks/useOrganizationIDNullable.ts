import { useParams } from 'react-router-dom'

export const useOrganizationIDNullable = () => {
  const { organizationID } = useParams()

  return {
    organizationID: organizationID ? +organizationID : null,
  }
}
