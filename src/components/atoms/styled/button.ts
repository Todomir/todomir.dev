import styled, { css } from 'styled-components'

type ButtonProps = {
  size?: 'large' | 'regular' | 'small'
  variant?: 'filled' | 'outlined'
}

const SIZE_MAP = {
  large: css`
    font-size: var(--fs-regular);
  `,
  regular: css`
    font-size: var(--fs-body);
  `,
  small: css`
    font-size: var(--fs-small);
  `
}

const VARIANT_MAP = {
  filled: css`
    background-color: var(--colors-green);
    color: var(--colors-black);
    border: none;

    &:hover {
      background-color: var(--colors-dark-green);
    }
  `,
  outlined: css`
    background-color: var(--colors-light-green);
    color: var(--colors-dark-green);
    border: 1px solid var(--colors-dark-green);

    &:hover {
      background-color: var(--colors-green);
      color: var(--colors-black);
    }
  `
}

const Button = styled.button<ButtonProps>`
  transition: all 0.6s;

  font-variation-settings: 'wght' 500;
  font-size: var(--fs-body);

  padding: var(--btn-spacing);

  border-radius: 0.75em;

  cursor: pointer;

  &:hover {
    transition: all 0.35s;
    transform: translateY(-2px);
  }

  ${({ variant = 'filled' }) => VARIANT_MAP[variant]}
  ${({ size = 'regular' }) => SIZE_MAP[size]}
`

export default Button
