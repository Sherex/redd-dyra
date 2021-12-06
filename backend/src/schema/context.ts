export function createContext () {
  return {
    userId: 0
  }
}

export type Context = ReturnType<typeof createContext>