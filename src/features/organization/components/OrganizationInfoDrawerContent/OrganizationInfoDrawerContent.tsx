import { useQuery } from 'react-query'
import { DrawerContent } from '@components/DrawerContent'
import { FieldLabelValue } from '@components/FieldLabelValue'
import { EMPTY_VALUE_DASH } from '@constants/index'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { useProfile } from '@hooks/useProfile'
import { useSignOut } from '@hooks/useSignOut'
import { Logout } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

interface OrganizationInfoDrawerContentProps {
  onClose: () => void
}

export const OrganizationInfoDrawerContent = ({ onClose }: OrganizationInfoDrawerContentProps) => {
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const { employment } = useProfile()
  const { signOut } = useSignOut()

  const query = useQuery([organizationID, 'organization', 'info'], async () => {
    try {
      const { data } = await api.orgOrgsRetrieve(organizationID)
      console.log(data)
      return data
    } catch (error) {
      //
    }
  })

  return (
    <DrawerContent
      title={`Сервисный центр: “${employment?.organization?.name ?? 'Без названия'}”`}
      renderFooter={(
        <>
          <Button
            variant={'contained'}
            startIcon={<Logout fontSize="small" />}
            disableElevation
            onClick={signOut}
          >
            Выйти из аккаунта
          </Button>
        </>
      )}
      onClose={onClose}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '12px',
        }}
      >
        <FieldLabelValue
          label={'Фактический адрес'}
          value={query.data?.requisites.physical_address?.value ?? EMPTY_VALUE_DASH}
        />
        <FieldLabelValue
          label={'Юридический адрес'}
          value={query.data?.requisites.legal_address?.value ?? EMPTY_VALUE_DASH}
        />
        <FieldLabelValue
          label={'Адрес для корреспонденции'}
          value={query.data?.requisites.postal_address?.value ?? EMPTY_VALUE_DASH}
        />
        <FieldLabelValue
          label={'Полное наименование'}
          value={query.data?.requisites.full_name ?? EMPTY_VALUE_DASH}
        />
        <FieldLabelValue
          label={'КПП'}
          value={query.data?.requisites.kpp ?? EMPTY_VALUE_DASH}
        />
        <FieldLabelValue
          label={'ИНН'}
          value={query.data?.requisites.inn ?? EMPTY_VALUE_DASH}
        />
        <FieldLabelValue
          label={'ОГРН'}
          value={query.data?.requisites.ogrn ?? EMPTY_VALUE_DASH}
        />
      </Box>
    </DrawerContent>
  )
}
