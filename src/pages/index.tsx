import { useRouter } from 'next/dist/client/router'

import Button from '@components/Button'
import FibonacciSpiral from '@components/FibonacciSpiral'
import Footer from '@components/Footer'
import IconButton from '@components/IconButton'
import Logo from '@components/Logo'

import en from '@utils/locales/home/en'
import ptBr from '@utils/locales/home/pt-br'

import { Container, HeroWrapper, Hero, Shape } from '../styles'

export default function Home() {
  const { locale } = useRouter()

  const getContent = () => {
    switch (locale) {
      case 'en-US':
        return en
      case 'pt-BR':
        return ptBr
      default:
        return ptBr
    }
  }

  const content = getContent()

  return (
    <>
      <Container>
        <Logo fontSize={16} size={31} />
        <HeroWrapper>
          <Shape />
          <Hero>
            <FibonacciSpiral />

            <Hero.Container>
              <Hero.Header>
                <IconButton
                  href="https://www.linkedin.com/in/todomir/"
                  icon="linkedin"
                />
                <IconButton href="https://t.me/todomirr" icon="telegram" />
                <IconButton
                  href="mailto:abnerluisrodrigues.contato@gmail.com"
                  icon="email"
                />
                <IconButton href="https://github.com/Todomir" icon="github" />
              </Hero.Header>

              <Hero.Title dangerouslySetInnerHTML={{ __html: content.title }} />

              <Hero.Footer>
                <Button label={content.primary} icon="arrow_right" />
                <Button label={content.secondary} color="secondary" outlined />
              </Hero.Footer>
            </Hero.Container>
          </Hero>
        </HeroWrapper>
      </Container>
      <Footer />
    </>
  )
}
