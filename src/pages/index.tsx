import { useRouter } from 'next/dist/client/router'

import { useEffect, useRef } from 'react'

import Button from '@components/Button'
import FibonacciSpiral from '@components/FibonacciSpiral'
import Footer from '@components/Footer'
import IconButton from '@components/IconButton'
import Logo from '@components/Logo'

import variants from '@utils/helpers/variants'
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
        return ptBr
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
    <>
      <Container variants={variants.container} initial="hidden" animate="show">
        <Logo fontSize={16} size={31} />
        <HeroWrapper>
          <Shape variants={variants.shape} />
          <Hero>
            <FibonacciSpiral />

            <Hero.Container ref={ref}>
              <Hero.Header
                variants={variants.header}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                <motion.span variants={variants.header.item}>
                  <IconButton
                    href="https://www.linkedin.com/in/todomir/"
                    icon="linkedin"
                  />
                </motion.span>
                <motion.span variants={variants.header.item}>
                  <IconButton href="https://t.me/todomirr" icon="telegram" />
                </motion.span>
                <motion.span variants={variants.header.item}>
                  <IconButton
                    href="mailto:abnerluisrodrigues.contato@gmail.com"
                    icon="email"
                  />
                </motion.span>
                <motion.span variants={variants.header.item}>
                  <IconButton href="https://github.com/Todomir" icon="github" />
                </motion.span>
              </Hero.Header>

              <Hero.Title
                variants={variants.title}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                {title.map(i => (
                  <motion.p
                    variants={variants.title.item}
                    key={i}
                    dangerouslySetInnerHTML={{ __html: i }}
                  />
                ))}
              </Hero.Title>

              <Hero.Footer
                variants={variants.footer}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                <motion.span variants={variants.footer.item}>
                  <Button label={content.primary} icon="arrow_right" />
                </motion.span>
                <motion.span variants={variants.footer.item}>
                  <Button
                    label={content.secondary}
                    color="secondary"
                    outlined
                  />
                </motion.span>
              </Hero.Footer>
            </Hero.Container>
          </Hero>
        </HeroWrapper>
      </Container>
      <Footer />
    </>
  )
}
