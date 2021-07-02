import { Heading, Text, Parallax } from '@components/atoms'

import { Blockquote } from './styles'

type TestimonialProps = {
  color?: 'green' | 'blue' | 'purple'
  avatar: string
  avatarSide?: 'left' | 'right'
  offset?: number
  client: string
  project: string
  quote: string
}

export default function Testimonial({
  color = 'purple',
  avatarSide = 'left',
  offset = 0,
  avatar,
  client,
  project,
  quote
}: TestimonialProps) {
  return (
    <Parallax offset={offset}>
      <Blockquote color={color} avatarSide={avatarSide}>
        <img src={avatar} alt="" />
        <Heading>{client}</Heading>
        <Text as="small">{project}</Text>
        <Text as="q" className="quote">
          {quote}
        </Text>
      </Blockquote>
    </Parallax>
  )
}
