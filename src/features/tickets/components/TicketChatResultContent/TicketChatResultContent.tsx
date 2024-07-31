import { VehicleChipRecommendationLevel } from '@features/vehicles/components/VehicleChipRecommendationLevel'
import { VehicleChipRecommendationSolution } from '@features/vehicles/components/VehicleChipRecommendationSolution'
import { Box } from '@mui/material'
import { VehicleRecommendation } from '~/api/servicepro.generated'

interface TicketChatResultContentProps {
  report: string | null
  recommendation: VehicleRecommendation | null
}

export const TicketChatResultContent = ({ report, recommendation }: TicketChatResultContentProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '6px',
      }}
    >
      <Box
        fontWeight={500}
      >
        Отчет
      </Box>
      <Box>
        {report || 'Нет данных'}
      </Box>
      {recommendation && (
        <>
          <Box
            fontWeight={500}
            sx={{ marginTop: '6px' }}
          >
            Рекомендация
          </Box>
          <Box>
            {recommendation.title ? (
              <>
                <Box>
                  {recommendation.title}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '4px',
                    marginTop: '8px',
                  }}
                >
                  <VehicleChipRecommendationLevel level={recommendation.level} />
                  <VehicleChipRecommendationSolution solution={recommendation.solution} />
                </Box>
              </>
            ) : 'Нет данных'}
          </Box>
        </>
      )}
    </Box>
  )
}
