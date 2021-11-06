export function dateToHuman (date: Date, decimals = 0): string {
  const relativeTime = Date.now() - date.getTime()
  const day = 3600000 * 24
  const week = day * 7
  const month = day * 30

  if (relativeTime < 1.5 * day) return `${(relativeTime / day).toFixed(decimals)} dag`
  else if (relativeTime < week) return `${(relativeTime / day).toFixed(decimals)} dager`
  else if (relativeTime < 2 * month) return `${(relativeTime / week).toFixed(decimals)} uker`
  else if (relativeTime < 24 * month) return `${(relativeTime / month).toFixed(decimals)} måneder`

  return `${(relativeTime / (12 * month)).toFixed(decimals)} år`
}
