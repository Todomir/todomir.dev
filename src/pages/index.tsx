import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

import { useEffect, useRef } from 'react'

import Button from '@components/Button'
import FibonacciSpiral from '@components/FibonacciSpiral'
import Footer from '@components/Footer'
import IconButton from '@components/IconButton'
import Logo from '@components/Logo'

import home from '@utils/helpers/animations/home'
import useWindowDimensions from '@utils/hooks/useWindowDimensions'
import en from '@utils/locales/home/en'
import ptBr from '@utils/locales/home/pt-br'

import { useIntersectionObserver } from '@asyarb/use-intersection-observer'
import { motion } from 'framer-motion'

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
        return en
    }
  }

  const content = getContent()
  const title = content.title.split(' ')
  const ref = useRef<HTMLDivElement | null>(null)

  const inView = useIntersectionObserver({
    ref,
    options: {
      threshold: 1,
      triggerOnce: true
    }
  })

  const { width, height } = useWindowDimensions()

  useEffect(() => {
    if (ref && ref.current && width < 1280 && height <= 1000 && !inView)
      setTimeout(() => ref.current.scrollIntoView(), 1300)
  }, [ref, inView])

  return (
    <motion.div
      variants={home.container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container>
        <Logo fontSize={16} size={31} />
        <HeroWrapper>
          <Shape variants={home.shape} />
          <Hero>
            <FibonacciSpiral />

            <Hero.Container ref={ref}>
              <Hero.Header
                variants={home.header}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                exit="exit"
              >
                <motion.div variants={home.header.item}>
                  <IconButton
                    href="https://www.linkedin.com/in/todomir/"
                    icon="linkedin"
                  />
                </motion.div>
                <motion.div variants={home.header.item}>
                  <IconButton href="https://t.me/todomirr" icon="telegram" />
                </motion.div>
                <motion.div variants={home.header.item}>
                  <IconButton
                    href="mailto:abnerluisrodrigues.contato@gmail.com"
                    icon="email"
                  />
                </motion.div>
                <motion.div variants={home.header.item}>
                  <IconButton href="https://github.com/Todomir" icon="github" />
                </motion.div>
              </Hero.Header>

              <Hero.Title
                variants={home.title}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                exit="exit"
              >
                {title.map((item, i) => (
                  <motion.p
                    key={i}
                    variants={home.title.item}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </Hero.Title>

              <Hero.Footer
                variants={home.footer}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                exit="exit"
              >
                <motion.span variants={home.footer.item}>
                  <Button label={content.primary} icon="arrow_right" />
                </motion.span>
                <motion.span variants={home.footer.item}>
                  <Link href="/about">
                    <a>
                      <Button
                        aria-label="about-link"
                        aria-role="link"
                        label={content.secondary}
                        color="secondary"
                        outlined
                      />
                    </a>
                  </Link>
                </motion.span>
              </Hero.Footer>
            </Hero.Container>
          </Hero>
        </HeroWrapper>
      </Container>
      <Footer />
    </motion.div>
  )
}
