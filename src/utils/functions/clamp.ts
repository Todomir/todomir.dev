export default (minWidthPx: number, maxWidthPx: number) =>
  (minFontSize: number, maxFontSize: number) => {
    if (typeof document === 'undefined') return

    const root = document.querySelector('html')
    const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2))

    const minWidth = minWidthPx / pixelsPerRem
    const maxWidth = maxWidthPx / pixelsPerRem

    const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth)
    const yAxisIntersection = -minWidth * slope + minFontSize

    return `clamp( ${minFontSize}rem, ${yAxisIntersection}rem + ${
      slope * 100
    }vw, ${maxFontSize}rem )`
  }
