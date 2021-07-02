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
    font-size: var(--fs-body-fluid);
    font-variation-settings: 'wght' 600;
  `,
  small: css`
    font-size: var(--fs-small);
    font-variation-settings: 'wght' 600;
  `
}

const VARIANT_MAP = {
  filled: css`
    background-color: var(--colors-green-400);
    color: var(--colors-gray-900);
    border: none;

    &:hover {
      background-color: var(--colors-green-600);
    }
  `,
  outlined: css`
    background-color: transparent;
    color: var(--colors-green-700);
    border: 1px solid var(--colors-green-700);

    &:hover {
      background-color: var(--colors-green-50);
      color: var(--colors-green-800);
    }
  `
}

const Button = styled.button<ButtonProps>`
  max-width: max-content;
  font-size: var(--fs-body);

  transition: all 0.6s;

  font-variation-settings: 'wght' 500;

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
