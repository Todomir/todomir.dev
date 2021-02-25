import styled from 'styled-components'

const StyledFooter = styled.footer`
  position: absolute;
  right: 0;
  font-family: 'Inconsolata', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.colors.black};

  p {
    padding: 0.688rem;
    text-align: end;
  }
`

export default function Footer() {
  return (
    <StyledFooter>
      <p>Designed and built with 💖💕 by Abner Luis</p>
    </StyledFooter>
  )
}
