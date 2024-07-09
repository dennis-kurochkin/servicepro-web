export const getNextMarkerZoom = (current: number): number => {
  if (current < 5) {
    return 7
  } else if (current < 10) {
    return 12
  } else if (current < 12) {
    return 14
  } else if (current >= 12 && current !== 16) {
    return 16
  } else {
    return 14
  }
}
