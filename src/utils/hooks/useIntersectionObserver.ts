import { useEffect, useRef, useState } from 'react'

export default function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<T>(null)
  const [isVisible, setVisible] = useState<boolean>(false)

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref, options])

  return { ref, isVisible }
}
