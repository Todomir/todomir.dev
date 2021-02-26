import { createContext, useContext, useState } from 'react'

interface IMountedContext {
  mounted: string[]
  mount: (route: string) => void
}

const MountedContext = createContext<IMountedContext | null>(null)

export default function MountedProvider({ children }) {
  const [mounted, setMounted] = useState<Array<string>>([])

  const mount = (route: string) => {
    setMounted(state => {
      const arr = [...state, route]
      const unique = new Set(arr)
      return Array.from(unique)
    })
  }

  return (
    <MountedContext.Provider value={{ mounted, mount }}>
      {children}
    </MountedContext.Provider>
  )
}
export const useMount = () => {
  return useContext(MountedContext)
}
