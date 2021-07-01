import { useEffect, useState } from 'react'

import { debounce } from '@utils/functions'

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  }
  return { width: 0, height: 0 }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', debounce(handleResize, 100))
    return () =>
      window.removeEventListener('resize', debounce(handleResize, 100))
  }, [])

  return windowDimensions
}
