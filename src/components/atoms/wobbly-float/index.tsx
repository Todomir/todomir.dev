import { ReactNode } from 'react'

import { Outer, Inner } from './styles'

type WobblyFloatProps = {
  children: ReactNode
}

export default function WobblyFloat({ children }: WobblyFloatProps) {
  return (
    <Outer>
      <Inner>{children}</Inner>
    </Outer>
  )
}
