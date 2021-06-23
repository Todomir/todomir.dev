import styled from 'styled-components'

type TextProps = {
  mw?: number
}

const Text = styled.p<TextProps>`
  font-variation-settings: 'wght' 400;
  font-size: var(--fs-regular-fluid);
  max-width: ${({ mw }) => `${mw}ch`};
`

export default Text
