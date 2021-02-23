import styled from 'styled-components'

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-family: 'Inconsolata', monospace;
  font-size: 0.425rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.colors.black};

  p {
    padding: 0.688rem;
    float: right;
  }
`

export default function Footer() {
  return (
    <StyledFooter>
      <p>Designed and built with 💖💕 by Abner Luis</p>
    </StyledFooter>
  )
}
