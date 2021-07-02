import {
  Heading as WorkHeading,
  Text as WorkText,
  Button as WorkButton
} from '@components/atoms'

import styled from 'styled-components'
export const WorkContainer = styled.section`
  background-color: var(--colors-blue-100);
  text-align: center;

  padding-block: 10.25rem;

  ${WorkHeading} {
    margin-block-end: 0.59em;
  }

  ${WorkText} {
    margin-block-end: 1.622em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    strong {
      font-variation-settings: 'wght' 700;
    }
  }

  ${WorkButton} {
    margin-inline-start: auto;
    margin-inline-end: auto;
  }
`
