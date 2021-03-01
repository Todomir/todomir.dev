import { useEffect } from 'react'

import { useMount } from '@context/MountedContext'

export default function useIntro(route: string) {
  const { mounted, mount } = useMount()

  useEffect(() => {
    return () => !mounted.includes(route) && mount(route)
  }, [])

  return mounted.includes(route)
}
