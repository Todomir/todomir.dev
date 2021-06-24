import styled from 'styled-components'

type HeadingProps = {
  mw?: number
}

const Heading = styled.h1<HeadingProps>`
  font-variation-settings: 'wght' 640;
  font-size: var(--fs-large-fluid);
  line-height: 110%;

  max-width: ${({ mw }) => `${mw}ch`};
`

export default Heading
