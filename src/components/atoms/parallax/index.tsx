import {
  Children,
  ReactElement,
  createElement,
  useState,
  useRef,
  useEffect
} from 'react'

import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
  useReducedMotion
} from 'framer-motion'

type ParallaxProps = {
  children: ReactElement | ReactElement[]
  offset?: number
}

export default function Parallax({ children, offset = 50 }: ParallaxProps) {
  const prefersReducedMotion = useReducedMotion()

  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const ref = useRef(null)

  const { scrollY } = useViewportScroll()

  // start animating our element when we've scrolled it into view
  const initial = elementTop - clientHeight
  // end our animation when we've scrolled the offset specified
  const final = elementTop + offset

  const yRange = useTransform(scrollY, [initial, final], [offset, -offset])
  // apply a spring to ease the result
  const y = useSpring(yRange, { stiffness: 400, damping: 90 })

  useEffect(() => {
    const element = ref.current
    // save our layout measurements in a function in order to trigger
    // it both on mount and on resize
    const onResize = () => {
      // use getBoundingClientRect instead of offsetTop in order to
      // get the offset relative to the viewport
      setElementTop(
        element.getBoundingClientRect().top + window.scrollY ||
          window.pageYOffset
      )
      setClientHeight(window.innerHeight)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [ref])

  return (
    <>
      {Children.map(children, child => {
        return prefersReducedMotion
          ? child
          : createElement(motion(child.type), {
              ...{
                ...child.props,
                ref,
                style: { y }
              }
            })
      })}
    </>
  )
}
