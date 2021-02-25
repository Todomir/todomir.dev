import styled from 'styled-components'

import Icon from './Icon'

interface IButton {
  size?: 'small' | 'default'
  color?: 'primary' | 'secondary'
  outlined?: boolean
  icon?: string
  label: string
}

interface IStyledButton {
  size: 'small' | 'default'
  color: 'primary' | 'secondary'
  outlined?: boolean
}

const StyledButton = styled.button<IStyledButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'Inconsolata', monospace;
  font-size: inherit;
  font-weight: 700;
  letter-spacing: -0.05em;
  padding: 0.625em 1em;
  gap: 0.875rem;
  border-radius: 0.688rem;
  background-color: ${props =>
    props.outlined
      ? props.theme.colors.white
      : props.color === 'primary'
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  color: ${props =>
    props.outlined
      ? props.color === 'primary'
        ? props.theme.colors.primary
        : props.theme.colors.secondary
      : props.color === 'primary'
      ? props.theme.colors.black
      : props.theme.colors.white};
  border: none;

  &::before {
    border-radius: 0.781rem;
    content: '';
    background-image: ${props =>
      props.outlined ? 'var(--main-gradient)' : 'none'};
    top: -0.125rem;
    left: -0.125rem;
    bottom: -0.125rem;
    right: -0.125rem;
    position: absolute;
    z-index: -1;
  }
`

export default function Button({
  size = 'default',
  color = 'primary',
  outlined,
  icon,
  label
}: IButton) {
  return (
    <StyledButton size={size} color={color} outlined={outlined}>
      <p>{label}</p>
      {icon && <Icon size={size === 'default' ? 20 : 16} type={icon} />}
    </StyledButton>
  )
}
