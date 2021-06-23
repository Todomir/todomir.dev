import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    ${({ theme }) => {
      return Object.keys(theme.colors).map(
        key => `--colors-${[key]}: ${theme.colors[key]};`
      )
    }}
  }

  html, body, #__next {
    min-height: 100vh;
    min-width: 100vw;

    font-family: 'SoraVariable', sans-serif;
    font-variation-settings: 'wght' 400;
    color: var(--colors-black);
    letter-spacing: -0.075em;
  }
`
