import { Heading as HeroHeading, Text as HeroText } from '@components/atoms'

import { up } from 'styled-breakpoints'
import styled from 'styled-components'

const HeroAside = styled.aside`
  z-index: -1;
  grid-row: 1;
  position: relative;
  width: 100%;

  ${up('sm')} {
    margin-inline-start: -1em;
    grid-area: 1 / 4 / 2 / -1;
  }
`
const HeroArticle = styled.article`
  ${up('sm')} {
    grid-area: 1 / 1 / 2 / 6;
  }
`

export const HeroContainer = Object.assign(
  styled.section`
    position: relative;

    display: grid;
    grid-template-rows: auto 1fr;

    margin-block-end: 4em;

    ${up('sm')} {
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: 1fr;
    }

    ${HeroHeading} {
      margin-block-end: 0.59em;
    }

    ${HeroText} {
      margin-block-start: 0;
      margin-block-end: 2.462em;
    }

    .btn-container {
      display: flex;
      gap: 1em;
      flex-direction: column;

      @media (min-width: 360px) {
        flex-direction: row;
      }
    }
  `,
  {
    Article: HeroArticle,
    Aside: HeroAside
  }
)
