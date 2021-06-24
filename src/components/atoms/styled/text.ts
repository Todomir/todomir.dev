import styled from 'styled-components'

type TextProps = {
  mw?: number
}

const Text = styled.p<TextProps>`
  ${({ theme }) => theme.fonts.regular}

  font-variation-settings: 'wght' 400;
  max-width: ${({ mw }) => `${mw}ch`};
`

export default Text
