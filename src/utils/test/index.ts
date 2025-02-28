export const sum = (a: UncertainNumberType, b: UncertainNumberType): number | null => {
  if (
    [null, undefined].includes(a) ||
    [null, undefined].includes(b)
  ) {
    return null
  }

  const num = Number(a) + Number(b)

  if (isNaN(num)) {
    return null
  }

  return num
}