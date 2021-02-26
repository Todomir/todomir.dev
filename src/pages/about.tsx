import { useRouter } from 'next/dist/client/router'

import Icon from '@components/Icon'
import IconButton from '@components/IconButton'
import Logo from '@components/Logo'

import { Title, Container } from '@styles/index'

import about from '@utils/helpers/animations/about'
import en from '@utils/locales/about/en'
import ptBr from '@utils/locales/about/pt-br'

import { motion } from 'framer-motion'
import { down } from 'styled-breakpoints'
import styled from 'styled-components'

const AboutContainer = styled(Container)`
  margin: 0 auto;
  padding: 0 1em;
  max-width: 50rem;
`

const AboutTitle = styled(Title)`
  font-weight: 900;
  font-size: 109px;

  ${down('sm')} {
    font-size: 80px;
    line-height: 80%;
    margin-top: 0.5em;
  }
`

const ReturnLink = styled(motion.div)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-top: 5.875em;
  cursor: pointer;

  p {
    margin-left: 0.625em;
  }
`
const Header = styled(motion.header)`
  display: inline-flex;
  padding-top: 2.188em;

  & div + div {
    margin-left: 1em;
  }
`
const Content = styled(motion.section)`
  padding-top: 3em;

  p {
    padding-bottom: 1em;
    font-size: 18px;
    line-height: 123%;
    width: 100%;

    ${down('sm')} {
      font-size: 16px;
    }
  }
`

export default function About() {
  const router = useRouter()
  const { locale } = router

  const getContent = () => {
    switch (locale) {
      case 'en-US':
        return en
      case 'pt-BR':
        return ptBr
      default:
        return en
    }
  }

  const content = getContent()

  return (
    <AboutContainer
      variants={about.container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Logo fontSize={16} size={31} />
      <ReturnLink
        variants={about.link}
        whileHover={{ y: -2 }}
        onClick={() => router.back()}
        aria-label="go-back"
        aria-role="link"
      >
        <Icon size={24} type="arrow_left" />
        <p>{content.return}</p>
      </ReturnLink>
      <AboutTitle variants={about.title}>{content.title}</AboutTitle>
      <Header variants={about.header}>
        <motion.div variants={about.header.item}>
          <IconButton
            href="https://www.linkedin.com/in/todomir/"
            icon="linkedin"
          />
        </motion.div>
        <motion.div variants={about.header.item}>
          <IconButton href="https://t.me/todomirr" icon="telegram" />
        </motion.div>

        <motion.div variants={about.header.item}>
          <IconButton
            href="mailto:abnerluisrodrigues.contato@gmail.com"
            icon="email"
          />
        </motion.div>
        <motion.div variants={about.header.item}>
          <IconButton href="https://github.com/Todomir" icon="github" />
        </motion.div>
      </Header>
      <Content variants={about.content}>
        {content.content.map((item, i) => (
          <motion.p variants={about.content.paragraph} key={i}>
            {item}
          </motion.p>
        ))}
      </Content>
    </AboutContainer>
  )
}
