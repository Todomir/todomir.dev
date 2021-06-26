import Image from 'next/image'

import {
  Heading,
  Highlight,
  Text,
  Button,
  WobblyFloat
} from '@components/atoms'

import { HeroContainer } from './styles'

export default function Hero() {
  return (
    <HeroContainer>
      <HeroContainer.Article>
        <Heading mw={17}>
          <Highlight>Upgrade</Highlight> your business’s web presence.
        </Heading>
        <Text mw={31}>
          I help you <Highlight strong>leave your mark</Highlight> in the world
          wide web using blazing fast websites.
        </Text>
        <div className="btn-container">
          <Button>Learn how</Button>
          <Button variant="outlined">Get in touch</Button>
        </div>
      </HeroContainer.Article>
      <HeroContainer.Aside>
        <WobblyFloat>
          <Image
            width={1030}
            height={901}
            objectFit="contain"
            src="/images/hero-image.svg"
            alt="Drawing of an man using an laptop, pointing to an hovering image of an website"
          />
        </WobblyFloat>
      </HeroContainer.Aside>
    </HeroContainer>
  )
}
