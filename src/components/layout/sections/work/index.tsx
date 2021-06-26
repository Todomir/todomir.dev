import { Heading, Text, Button, Container } from '@components/atoms'

import { WorkContainer } from './styles'

export default function Work() {
  return (
    <WorkContainer className="span-full">
      <Container>
        <Heading mw={23}>
          Let me worry about the techy stuff. Worry about your clients.
        </Heading>
        <Text mw={30}>
          I’ve been messing with websites for almost 4 years.{' '}
          <strong>Let me handle this.</strong>
        </Text>
        <Button>Send me an message</Button>
      </Container>
    </WorkContainer>
  )
}
