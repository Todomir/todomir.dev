import { useRouter } from 'next/router'

import Logo from '@components/Logo'
import ProjectCard from '@components/ProjectCard'

import { Container, Title } from '@styles/index'

import projects from '@utils/helpers/animations/projects'
import projectList from '@utils/helpers/projects/projects.json'
import useWindowDimensions from '@utils/hooks/useWindowDimensions'
import en from '@utils/locales/projects/en'
import ptBr from '@utils/locales/projects/pt-br'

import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { down } from 'styled-breakpoints'
import styled from 'styled-components'

const ProjectsContainer = styled(Container)`
  padding: 0 106px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'card title';
  min-height: 100vh;
  gap: 1em;

  ${down('lg')} {
    padding: 0 80px;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'title'
      'card';
  }

  ${down('sm')} {
    padding: 0 20px;
  }
`
const ProjectsTitle = styled(Title)`
  font-size: 72px;
  font-weight: 900;
  letter-spacing: -0.05em;
  margin-top: 8.813rem;

  ${down('lg')} {
    margin-top: 3rem;
    font-size: 64px;
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
const CardContainer = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 1.25em;
  grid-area: card;
  z-index: 2;

  ${down('sm')} {
    grid-template-columns: 1fr;
  }
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

export default function Projects() {
  const { scrollY } = useViewportScroll()
  const { width } = useWindowDimensions()

  const titlePos = useTransform(scrollY, [0, 300], [0, 200])

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

  return (
    <ProjectsContainer
      variants={projects.container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <CardContainer variants={projects.cards}>
        {projectList.map(project => (
          <motion.div key={project.id} variants={projects.cardItem}>
            <ProjectCard
              id={project.id}
              label={content.buttonLabel}
              title={project.title}
              image={project.image}
            />
          </motion.div>
        ))}
      </CardContainer>
      <HeadContainer style={{ y: width > 768 ? 0 : titlePos }}>
        <Content>
          <ProjectsTitle variants={projects.title}>
            {content.title}
          </ProjectsTitle>
          <motion.p variants={projects.description}>
            {content.description}
          </motion.p>
          <LogoContainer variants={projects.logo}>
            <Logo fontSize={16} size={31} />
          </LogoContainer>
        </Content>
      </HeadContainer>
    </ProjectsContainer>
  )
}
