export type LogLevel = 'silly' | 'debug' | 'info' | 'verbose' | 'warn' | 'error'
export type LogMessage = string | number | undefined | Error

const minimumLogLevel: LogLevel = window.location.hostname === 'localhost' ? 'silly' : 'warn'

function log (level: LogLevel, message: LogMessage | LogMessage[]): void {
  if (getLevel(level) > getLevel(minimumLogLevel)) return
  message = Array.isArray(message) ? message : [message]

  console.log(`[ ${getDateTime()} ] < ${level.toUpperCase()} > ${message.join(' - ')}`)

  if (getLevel(minimumLogLevel) >= getLevel('debug')) {
    const error = message.find(part => part instanceof Error)
    if (typeof error !== 'undefined') console.error(error)
  }
}

function getDateTime (): string {
  const dateObject = new Date()
  const [date, time, milli] = dateObject.toISOString().split(/T|Z|\./)
  return `${date} ${time}.${milli}`
}

function getLevel (level: LogLevel): number {
  level = level.toLocaleLowerCase() as LogLevel
  const levelMapper = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  }
  return levelMapper[level]
}

export {
  log
}
