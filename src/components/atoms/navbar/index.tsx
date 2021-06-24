import Image from 'next/image'

import { Button } from '@components/atoms'

import { Nav } from './styles'

export default function Navbar() {
  return (
    <Nav>
      <ul>
        <li>
          <Image
            src="/logo-lg.svg"
            alt="todomir.dev logotype"
            width={112}
            height={19}
          />
        </li>
        <li>
          <Button as="a" variant="outlined">
            Contact me
          </Button>
        </li>
      </ul>
    </Nav>
  )
}
