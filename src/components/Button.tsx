import theme from '@styles/theme'

import lightenDarkenColor from '@utils/functions/lightenDarkenColor'

import { motion } from 'framer-motion'
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

const StyledButton = styled(motion.button)<IStyledButton>`
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
  border: ${props =>
    props.outlined
      ? props.color === 'primary'
        ? `2px solid ${props.theme.colors.primary}`
        : `2px solid ${props.theme.colors.secondary}`
      : 'none'};

  &:focus {
    box-shadow: ${props =>
      `0px 0px 0px 4px ${
        props.color === 'primary'
          ? lightenDarkenColor(theme.colors.primary, -30)
          : lightenDarkenColor(theme.colors.secondary, 30)
      }`};
  }
`

export default function Button({
  size = 'default',
  color = 'primary',
  outlined,
  icon,
  label
}: IButton) {
  const renderButtonHoverStyle = () => {
    const styles = { y: -2, backgroundColor: theme.colors.white }
    if (outlined) {
      if (color === 'primary') {
        styles.backgroundColor = lightenDarkenColor(theme.colors.primary, 125)
      } else {
        styles.backgroundColor = lightenDarkenColor(theme.colors.secondary, 125)
      }
    } else {
      if (color === 'primary') {
        styles.backgroundColor = lightenDarkenColor(theme.colors.primary, 20)
      } else {
        styles.backgroundColor = lightenDarkenColor(theme.colors.secondary, 20)
      }
    }

    return styles
  }
  return (
    <StyledButton
      whileHover={renderButtonHoverStyle()}
      whileTap={{
        backgroundColor: lightenDarkenColor(theme.colors.primary, 20),
        scale: 0.9
      }}
      layout
      size={size}
      color={color}
      outlined={outlined}
    >
      <p>{label}</p>
      {icon && <Icon size={size === 'default' ? 20 : 16} type={icon} />}
    </StyledButton>
  )
}
