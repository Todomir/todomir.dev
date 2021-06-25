import { Button as NavButton } from '@components/atoms'

import styled from 'styled-components'

export const Nav = styled.nav`
  ul {
    padding-inline-start: 0;

    display: flex;
    list-style-type: none;
    align-items: center;
    justify-content: space-between;

    margin-block-start: 2em;
    margin-block-end: 2em;

    li {
      ${NavButton} {
        --tt-key: nav-button;
        font-size: var(--fs-body);

        @keyframes nav-button {
          0%,
          25.874999999999996% {
            font-size: 0.618rem;
          }
          48% {
            font-size: 1rem;
          }
        }
      }
    }
  }
`
