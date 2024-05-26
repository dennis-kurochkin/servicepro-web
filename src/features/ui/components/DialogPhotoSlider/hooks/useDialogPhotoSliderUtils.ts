import { useSearchParams } from 'react-router-dom'
import { SearchParamsKey } from '@features/shared/data'

export const useDialogPhotoSliderUtils = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return {
    currentPictureIndex: +(searchParams.get(SearchParamsKey.PhotoSliderPhotoIndex) ?? 0),
    setCurrentPictureIndex: (index: number) => {
      searchParams.set(SearchParamsKey.PhotoSliderPhotoIndex, index.toString())
      setSearchParams(searchParams)
    },
    resetCurrentPictureIndex: () => {
      searchParams.delete(SearchParamsKey.PhotoSliderPhotoIndex)
      setSearchParams(searchParams)
    },
  }
}
