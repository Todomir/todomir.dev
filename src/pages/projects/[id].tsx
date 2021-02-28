import { GetStaticPaths, GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Icon from '@components/Icon'
import Logo from '@components/Logo'

import { Container, Title } from '@styles/index'

import singleProject from '@utils/helpers/animations/singleProject'
import projects from '@utils/helpers/projects/projects.json'

import { motion } from 'framer-motion'
import { down } from 'styled-breakpoints'
import styled from 'styled-components'

const ProjectContainer = styled(Container)`
  max-width: 94%;
  margin: 0 auto;
  padding: 0 2rem;

  ${down('sm')} {
    max-width: 100%;
    margin: 0;
    padding: 0 1rem;
  }
`

const BackgroundContainer = styled(motion.header)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.black};
  min-height: 30rem;
  overflow: hidden;
  border-radius: 0px 0px 80px 80px;

  ${down('sm')} {
    margin: 0 calc(-50vw + 50%);
    border-radius: 0px;
  }

  ${Title} {
    font-size: 4.875rem;
    color: ${({ theme }) => theme.colors.white};
    bottom: 0;
    z-index: 2;

    ${down('sm')} {
      font-size: 2.5rem;
    }
  }
`

const ImageContainer = styled(motion.figure)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  pointer-events: none;
`

const Description = styled(motion.section)`
  font-size: 1.125rem;
  max-width: 60rem;
  line-height: 123%;
  margin: 6.875rem auto 7.625rem;

  p {
    strong {
      font-weight: 900;
    }
    em {
      font-style: italic;
    }
    a {
      background: var(--main-gradient);
      background-clip: text;

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  & p + p {
    margin-top: 1.5em;
  }
`

const LogoContainer = styled(motion.section)`
  margin-bottom: 1.813em;
`

const HeaderContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3.75rem 6.938rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${down('sm')} {
    text-align: center;
    padding: 2rem;
  }
`

const ReturnLink = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
`

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map(project => ({ params: { id: project.id } }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find(project => project.id === params.id)

  const ptBr = await renderToString(project.descriptionBr)
  const en = await renderToString(project.descriptionEn)

  return {
    props: {
      project,
      source: { ptBr, en }
    }
  }
}

export default function Project({ project, source }) {
  const { locale } = useRouter()
  const { en, ptBr } = source

  const getContent = () => {
    switch (locale) {
      case 'en-US':
        return hydrate(en)
      case 'pt-BR':
        return hydrate(ptBr)
      default:
        return hydrate(en)
    }
  }

  const content = getContent()

  return (
    <ProjectContainer
      variants={singleProject.container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <BackgroundContainer variants={singleProject.bg}>
        <HeaderContainer variants={singleProject.header}>
          <motion.span
            style={{ zIndex: 2 }}
            variants={singleProject.header.item}
          >
            <Link href="/projects">
              <ReturnLink whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Icon type="arrow_left" size={24} />
              </ReturnLink>
            </Link>
          </motion.span>
          <Title variants={singleProject.header.item}>{project.title}</Title>
        </HeaderContainer>
        <ImageContainer>
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
        </ImageContainer>
      </BackgroundContainer>
      <Description variants={singleProject.description}>{content}</Description>
      <LogoContainer variants={singleProject.logo}>
        <Logo fontSize={16} size={31} />
      </LogoContainer>
    </ProjectContainer>
  )
}
