import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Footer from '@components/Footer'

import en from '@utils/locales/home/en'
import ptBr from '@utils/locales/home/pt-br'

import { Container, Logo, Title, Content } from '../styles'

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
    <Container>
      <Head>
        <title>todomir.dev</title>
      </Head>

      <Logo>
        <Image src="/logo.svg" alt="todomir.dev logo" width={31} height={31} />
        <span>todomir.dev</span>
      </Logo>

      <Title>{content.title}</Title>
      <Content>
        <p>{content.description[0]}</p>
        <p>
          {content.description[1]}{' '}
          <Link href="https://github.com/Todomir">
            <a>Github</a>
          </Link>
          .
        </p>
      </Content>

      <Footer />
    </Container>
  )
}
