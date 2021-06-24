import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    /* Generating colors from theme.colors */
    ${({ theme: { colors } }) =>
      Object.keys(colors).map(key => `--colors-${[key]}: ${colors[key]};`)}
      
    /* Font sizes */
    --fs-largest: 6.854rem;
    --fs-large: 4.236rem;
    --fs-medium: 2.618rem;
    --fs-regular: 1.618rem;
    --fs-body: 1rem;
    --fs-small: 0.618rem;
      
    --btn-spacing: 0.75em 1.5em;
    
  }

  html, body, #__next {
    overflow-x: hidden;
    
    min-height: 100vh;
    min-width: 100vw;

    font-family: 'SoraVariable', sans-serif;
    font-variation-settings: 'wght' 400;
    color: var(--colors-black);
    letter-spacing: -0.075em;
  }

  h1, h2, h3, h4, h5, h6, p, button {
    letter-spacing: -0.075em;
  }

  button {
    font-family: 'SoraVariable', sans-serif;
    color: var(--colors-black);
  }
`
