import styled from 'styled-components'

type HeadingProps = {
  mw?: number
}

const Heading = styled.h1<HeadingProps>`
  ${({ theme }) => theme.fonts.large}

  font-variation-settings: 'wght' 640;
  font-size: var(--fs-large);
  line-height: 110%;

  max-width: ${({ mw }) => `${mw}ch`};
`

export default Heading
