import {
  Heading as ProblemHeading,
  Text as ProblemText,
  Container
} from '@components/atoms'

import { up } from 'styled-breakpoints'
import styled from 'styled-components'

const ProblemAside = styled.aside`
  align-self: center;
  margin-block-start: -7rem;

  ${up('lg')} {
    margin-block-start: -6rem;
    margin-block-end: -10rem;
  }
`

const Content = styled.div`
  ${up('lg')} {
    flex-direction: row-reverse;
    gap: 4em;
  }
`

export const ProblemContainer = Object.assign(
  styled(Container)`
    position: relative;
    background-color: var(--colors-orange-50);

    padding-block-start: 3.5em;
    padding-block-end: 4em;

    ${Content} {
      display: flex;
      flex-direction: column-reverse;
      gap: 2em;

      ${up('lg')} {
        flex-direction: row-reverse;
        gap: 4em;
      }

      ${ProblemHeading} {
        margin-block-end: 0.59em;
      }

      ${ProblemText} {
        --tt-key: problem-text;
        font-size: 1.125rem;
        max-width: 38.625rem;
        margin-block-start: 0;
        margin-block-end: 1.5em;

        @keyframes problem-text {
          0%,
          23.4375% {
            font-size: 1rem;
          }
          48% {
            font-size: 1.125rem;
          }
        }
      }
    }
  `,
  {
    Aside: ProblemAside,
    Content
  }
)
