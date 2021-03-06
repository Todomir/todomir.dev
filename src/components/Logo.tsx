import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'
import styled from 'styled-components'

interface ILogo {
  size: number
  fontSize: number
}

const toREM = (val: number) => val / 16

export const Container = styled(motion.div)<{ fontSize: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inconsolata', monospace;
  font-weight: 700;
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 1.875rem;
  letter-spacing: 0;

  span {
    margin-left: 0.375rem;
  }
`

export default function Logo({ size, fontSize }: ILogo) {
  return (
    <Link href="/">
      <a>
        <Container whileHover={{ scale: 1.1 }} fontSize={toREM(fontSize)}>
          <Image
            priority
            src="/logo.svg"
            alt="todomir.dev logo"
            width={size}
            height={size}
          />
          <span>todomir.dev</span>
        </Container>
      </a>
    </Link>
  )
}
