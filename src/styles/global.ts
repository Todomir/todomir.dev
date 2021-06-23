import { clamp } from '@utils/functions'

import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  :root {
    /* Generating colors from theme.colors */
    ${({ theme }) =>
      Object.keys(theme.colors).map(
        key => `--colors-${[key]}: ${theme.colors[key]};`
      )}
    
    /* Font sizes */
    --fs-largest: 6.854rem;
    --fs-large: 4.236rem;
    --fs-medium: 2.618rem;
    --fs-regular: 1.618rem;
    --fs-body: 1rem;
    --fs-small: 0.618rem;

    --fs-large-fluid: ${({ theme: { breakpoints } }) =>
      clamp(breakpoints.sm, breakpoints.lg)(1.618, 4.236)};
    --fs-small-fluid: ${({ theme: { breakpoints } }) =>
      clamp(breakpoints.sm, breakpoints.lg)(1, 1.618)};
      
    --btn-spacing: 0.75em 1.5em;
    
  }

  html, body, #__next {
    min-height: 100vh;
    min-width: 100vw;

    font-family: 'SoraVariable', sans-serif;
    font-variation-settings: 'wght' 400;
    color: var(--colors-black);
    letter-spacing: -0.075em;
  }

  button {
    font-family: 'SoraVariable', sans-serif;
    letter-spacing: -0.075em;
    color: var(--colors-black);
  }
`
