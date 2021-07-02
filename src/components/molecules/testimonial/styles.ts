import {
  Heading as TestimonialHeading,
  Text as TestimonialText
} from '@components/atoms'

import styled, { keyframes } from 'styled-components'

const blockquote = keyframes`
  0%,
  23.4375% {
    padding: 1.5rem 2.5rem;
    border-radius: 2rem;
  }
  68% {
    padding: 4.5rem 6.25rem;
    border-radius: 3.75rem;
  }
  81.25% {
    padding: 4.5rem 6.25rem;
  }
`

const heading = keyframes`
  0%,
  23.4375% {
    font-size: var(--fs-regular);
    margin-block-end: 0.1em;
  }
  48% {
    font-size: 1.8rem;
    margin-block-end: 0.3em;
  }
  81.25% {
    font-size: var(--fs-medium);
    margin-block-end: 0.3em;
  }
`

const image = keyframes`
  0%,
  23.4375% {
    width: 64px;
    height: 64px;
  }
  48% {
    width: 64px;
    height: 64px;
  }
  81.25% {
    width: 138px;
    height: 138px;
  }
`

type BlockquoteProps = {
  color?: 'green' | 'blue' | 'purple'
  avatarSide?: 'left' | 'right'
}

export const Blockquote = styled.blockquote<BlockquoteProps>`
  width: 100%;
  max-width: 62rem;

  margin: 0;
  margin-left: auto;

  --tt-key: ${blockquote};
  ${blockquote};

  background-color: ${({ color = 'purple' }) => `var(--colors-${color})`};

  padding: 4.5rem 6.25rem;
  border-radius: 3.75rem;
  position: relative;

  box-shadow: 34.863px 31.5209px 80px rgba(0, 0, 0, 0.1),
    13.4287px 12.1414px 25.4815px rgba(0, 0, 0, 0.0607407),
    2.84069px 2.56837px 6.51852px rgba(0, 0, 0, 0.0392593);

  img {
    --tt-key: ${image};
    ${image};

    object-fit: cover;

    position: absolute;
    top: 0;
    left: ${({ avatarSide }) => (avatarSide === 'left' ? 0 : '100%')};
    transform: translateX(-40%) translateY(-40%);

    width: 138px;
    height: 138px;
    border-radius: 50%;

    background-color: gray;

    box-shadow: 34.863px 31.5209px 80px rgba(0, 0, 0, 0.1),
      13.4287px 12.1414px 25.4815px rgba(0, 0, 0, 0.0607407),
      2.84069px 2.56837px 6.51852px rgba(0, 0, 0, 0.0392593);
  }

  ${TestimonialHeading} {
    --tt-key: ${heading};
    ${heading};

    font-size: var(--fs-medium);
    font-variation-settings: 'wght' 490;
    margin-block-end: 0.3em;
  }

  ${TestimonialText} {
    display: block;

    opacity: 0.6;
    margin-block-start: 0;
  }

  .quote {
    margin-block-start: 2.5rem;
    opacity: 1;
  }
`
