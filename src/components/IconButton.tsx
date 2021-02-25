import Link from 'next/link'

import { motion } from 'framer-motion'
import styled from 'styled-components'

import Icon from './Icon'

interface IIconButton {
  href: string
  size?: 'default' | 'small'
  icon?: string
}

const Div = styled(motion.div)<{ size: 'default' | 'small' }>`
  display: inline-block;
  position: relative;
  cursor: pointer;

  section {
    background-image: var(--main-gradient);
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.white};
    padding: ${props =>
      props.size === 'default'
        ? '4px 4px 2.1px 4px;'
        : '2.44px 2.44px 1.05px 2.44px;'};
    border-radius: ${props => (props.size === 'default' ? '8.24px' : '4.6px')};
  }

  &::before {
    content: '';
    border-radius: ${props => (props.size === 'default' ? '10px' : '5.58px')};
    background-image: var(--main-gradient);
    top: ${props => (props.size === 'default' ? '-3px' : '-1.83px')};
    left: ${props => (props.size === 'default' ? '-3px' : '-1.83px')};
    bottom: ${props => (props.size === 'default' ? '-3px' : '-1.83px')};
    right: ${props => (props.size === 'default' ? '-3px' : '-1.83px')};
    position: absolute;
    z-index: -1;
  }
`

export default function IconButton({
  href,
  icon,
  size = 'default'
}: IIconButton) {
  return (
    <Link href={href}>
      <a>
        <Div
          whileHover={{
            y: -10,
            transition: {
              duration: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          size={size}
        >
          <section>
            <Icon size={size === 'default' ? 20 : 12} type={icon} />
          </section>
        </Div>
      </a>
    </Link>
  )
}
