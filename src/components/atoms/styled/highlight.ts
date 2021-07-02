import styled, { css } from 'styled-components'

type HighlightProps = {
  strong?: boolean
}

const Highlight = styled.span<HighlightProps>`
  position: relative;

  transition: all 0.45s cubic-bezier(0.18, 0.2, 0, 0.98);
  z-index: 1;

  ${({ strong }) =>
    strong &&
    css`
      font-variation-settings: 'wght' 600;
    `}

  &::after {
    transition: all 0.35s cubic-bezier(0.18, 0.2, 0, 0.98);

    content: '';

    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 0.8ch;

    background-color: var(--colors-green-400);

    z-index: -1;
  }

  &:hover {
    font-variation-settings: 'wght' 800;

    &::after {
      height: 100%;
    }
  }
`

export default Highlight
