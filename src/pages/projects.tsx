import Logo from '@components/Logo'
import ProjectCard from '@components/ProjectCard'

import { Container, Title } from '@styles/index'

import useWindowDimensions from '@utils/hooks/useWindowDimensions'

import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { down } from 'styled-breakpoints'
import styled from 'styled-components'

const ProjectsContainer = styled(Container)`
  padding: 0 106px;
  display: grid;
  grid-template-columns: minmax(1fr, 319px) 1fr minmax(1fr, 319px);
  grid-template-areas: 'card-left title card-right';
  min-height: 100vh;
  gap: 1em;

  ${down('lg')} {
    padding: 0 80px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'title title'
      'card-left card-right';
  }

  ${down('sm')} {
    padding: 0 20px;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 1fr;
    grid-template-areas:
      'title'
      'card-left'
      'card-right';
  }
`
const ProjectsTitle = styled(Title)`
  font-size: 64px;
  font-weight: 900;
  letter-spacing: -0.05em;
  margin-top: 8.813rem;

  ${down('lg')} {
    margin-top: 3rem;
  }
`

const LogoContainer = styled(motion.section)`
  grid-area: logo;
  margin-top: 25.938em;

  ${down('lg')} {
    margin-top: 1.8125em;
  }
`

const HeadContainer = styled(motion.section)`
  grid-area: title;
  position: relative;
  display: flex;
  justify-content: center;
`
const LeftCardContainer = styled(motion.section)`
  display: grid;
  gap: 1.25em;
  grid-area: card-left;
  z-index: 2;
`
const RightCardContainer = styled(motion.section)`
  display: grid;
  gap: 1.25em;
  grid-area: card-right;
  z-index: 2;
`
const Content = styled(motion.section)`
  display: grid;
  position: fixed;
  top: 0;
  width: 329px;
  font-size: 16px;
  text-align: center;
  grid-template-areas:
    'title'
    'content'
    'logo';

  ${down('lg')} {
    position: relative;
    grid-template-areas:
      'logo'
      'title'
      'content';
    margin-bottom: 3em;
  }
`

export default function projects() {
  const { scrollY } = useViewportScroll()
  const { width } = useWindowDimensions()

  const cardLPos = useTransform(scrollY, [-100, 400], [0, 200])
  const cardRPos = useTransform(scrollY, [0, 300], [0, 100])
  const titlePos = useTransform(scrollY, [0, 300], [0, 200])

  return (
    <ProjectsContainer>
      <LeftCardContainer style={{ y: width < 768 ? 0 : cardLPos }}>
        <ProjectCard title="todomir.dev" image="/" />
        <ProjectCard title="Monitonline" image="/" />
        <ProjectCard title="Proffy" image="/" />
      </LeftCardContainer>
      <HeadContainer style={{ y: width > 768 ? 0 : titlePos }}>
        <Content>
          <ProjectsTitle>PROJECTS</ProjectsTitle>
          <motion.p>
            This page is dedicated to exposing all of my projects. Check it out
            and see if anything interests you!
          </motion.p>
          <LogoContainer>
            <Logo fontSize={16} size={31} />
          </LogoContainer>
        </Content>
      </HeadContainer>
      <RightCardContainer style={{ y: width < 768 ? 0 : cardRPos }}>
        <ProjectCard title="RMG" image="/" />
        <ProjectCard title="JAKA" image="/" />
        <ProjectCard title="Clickbus Backend Challenge" image="/" />
      </RightCardContainer>
    </ProjectsContainer>
  )
}
