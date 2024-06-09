import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@mui/icons-material'
import { Button, Skeleton, Typography } from '@mui/material'

interface PageEntityHeaderProps {
  title: string
  isFetching: boolean
}

export const PageEntityHeader = ({ title, isFetching }: PageEntityHeaderProps) => {
  const navigate = useNavigate()

  return (
    <>
      <Button
        variant={'outlined'}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
        Вернуться
      </Button>
      <Typography
        variant={'h5'}
        sx={{
          marginTop: '20px',
        }}
      >
        {isFetching ? (
          <Skeleton
            variant={'rounded'}
            sx={{
              position: 'relative',
              bottom: '-4px',
              display: 'inline-block',
              width: '300px',
              height: '28px',
              margin: '0 8px',
            }}
          />
        ) : (
          <>
            {title}
          </>
        )}
      </Typography>
    </>
  )
}
