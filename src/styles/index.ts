import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import { down } from 'styled-breakpoints'
import styled, { DefaultTheme, StyledComponent } from 'styled-components'

interface IHero {
  Title?: StyledComponent<
    ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'h1'>>,
    DefaultTheme,
    Record<string, unknown>,
    never
  >
  Container?: StyledComponent<
    'div',
    DefaultTheme,
    Record<string, unknown>,
    never
  >
  Header?: StyledComponent<
    ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'header'>>,
    DefaultTheme,
    Record<string, unknown>,
    never
  >
  Footer?: StyledComponent<
    ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'footer'>>,
    DefaultTheme,
    Record<string, unknown>,
    never
  >
}

export const Container = styled(motion.div)`
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;

  min-height: 100vh;
`

export const Title = styled(motion.h1)`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 125%;

  strong {
    font-weight: 900;
  }
`

export const Shape = styled(motion.div)`
  position: absolute;
  width: 45%;
  height: 130%;
  background: var(--main-gradient);
  top: 0;
  left: 0;
  transform: translate(0, -5rem);
  border-radius: 0px 30px 180px 0px;
  z-index: -10;

  ${down('xl')} {
    transform: translate(0, -4.625rem);
  }

  ${down('lg')} {
    height: 473px;
    transform: translate(-50%, 1rem);
    width: 100%;
    left: 50%;
    right: 50%;
    border-radius: 236.5px 30px;
  }

  ${down('sm')} {
    height: 414px;
    transform: translate(-50%, 5.35rem);
    border-radius: 207px 0px 0px 40px;
  }
`

export const HeroWrapper = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 4.563rem;
  position: relative;

  ${down('sm')} {
    margin-top: 2.938rem;
  }
`

export const Hero: StyledComponent<
  'div',
  DefaultTheme,
  Record<string, unknown>,
  never
> &
  IHero = styled.div`
  display: flex;

  ${down('lg')} {
    flex-direction: column;
  }

  ${down('sm')} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`
Hero.Title = styled(Title)`
  max-width: 28rem;
  margin-top: 1.875rem;

  font-size: 3.32rem;

  p {
    display: inline-block;
    margin-right: 0.2em;
  }

  ${down('xl')} {
    font-size: 2.454rem;
    max-width: 20rem;
  }

  ${down('lg')} {
    font-size: 3.438rem;
    max-width: 45.938rem;
  }

  ${down('sm')} {
    font-size: 1.563rem;
    max-width: 21.938rem;
    margin-top: 0.703rem;
  }
`
Hero.Container = styled.div`
  margin-left: 4.188rem;

  ${down('lg')} {
    margin-left: 0;
  }

  ${down('sm')} {
    padding: 0 2.5rem;
  }
`
Hero.Header = styled(motion.header)`
  margin-top: 3.5rem;

  ${down('lg')} {
    margin-top: 5.625rem;
  }

  ${down('sm')} {
    margin-top: 2.063rem;
  }

  & span + span {
    padding-left: 0.8rem;
  }
`

Hero.Footer = styled(motion.footer)`
  margin-top: 3.813rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1.5rem;
  font-size: 18px;

  ${down('sm')} {
    margin-top: 1.788rem;
    font-size: 14px;
  }
`
