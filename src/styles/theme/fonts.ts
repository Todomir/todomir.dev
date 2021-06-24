import { css } from 'styled-components'

export default {
  large: css`
    --tt-key: ff-large;
    font-size: var(--fs-large);

    @keyframes ff-large {
      0%,
      23.5625% {
        letter-spacing: -0.075em;
        font-size: var(--fs-regular);
      }
      37.75% {
        font-size: 3rem;
      }
      79.875% {
        font-size: var(--fs-large);
      }
    }
  `,
  regular: css`
    --tt-key: ff-regular;
    font-size: var(--fs-regular);

    @keyframes ff-regular {
      0%,
      23.5625% {
        letter-spacing: -0.075em;
        font-size: var(--fs-body);
        line-height: 1.65;
      }
      47.875% {
        font-size: 1.6rem;
        line-height: 1.35;
      }
      79.875% {
        font-size: var(--fs-regular);
      }
    }
  `,
  body: css`
    --tt-key: ff-body;
    font-size: var(--ff-body);

    @keyframes ff-body {
      0%,
      25.874999999999996% {
        font-size: var(--fs-small);
      }
      32.1875% {
        font-size: 1.25rem;
      }
      40% {
        font-size: 1.25rem;
      }
      45% {
        font-size: var(--fs-body);
      }
      81.25% {
        font-size: var(--fs-body);
      }
    }
  `
}
