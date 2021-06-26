import styled, { keyframes } from 'styled-components'

const outerAnimation = keyframes`
  0% {
      transform: translateY(3px);
    }
    100% {
      transform: translateY(-3px);
    }
`
const innerAnimation = keyframes`
  0% {
      transform: rotate(1deg);
    }
    100% {
      transform: translateY(-1deg);
    }
`

export const Outer = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: 3000ms ease-in-out 0s infinite alternate none running
      ${outerAnimation};
  }
`

export const Inner = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: 6000ms ease-in-out 0s infinite alternate none running
      ${innerAnimation};
    transform-origin: center bottom 0px;
  }
`
