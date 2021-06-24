import { Container, Navbar } from '@components/atoms'
import { Hero, Problem } from '@components/layout'

export default function Home() {
  return (
    <Container as="main">
      <Navbar />
      <Hero />
      <Problem />
    </Container>
  )
}
