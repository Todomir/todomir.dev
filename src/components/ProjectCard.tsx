import Link from 'next/link'
import { useRouter } from 'next/router'

import { Title } from '@styles/index'

import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import styled, { DefaultTheme, StyledComponent } from 'styled-components'

import Button from './Button'

interface ICard {
  Content?: StyledComponent<
    ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'div'>>,
    DefaultTheme,
    Record<string, unknown>,
    never
  >
  Title?: StyledComponent<
    ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'h1'>>,
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
  Background?: StyledComponent<
    ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'footer'>>,
    DefaultTheme,
    Record<string, unknown>,
    never
  >
}

const Card: StyledComponent<
  ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'div'>>,
  DefaultTheme,
  Record<string, unknown>,
  never
> &
  ICard = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 23rem;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.black};
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.08),
    0px 0px 1px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
`
Card.Content = styled(motion.div)`
  position: absolute;
  text-align: center;
  bottom: 0;
  z-index: 2;
`
Card.Title = styled(Title)`
  font-size: 35px;
  color: ${({ theme }) => theme.colors.white};
`
Card.Footer = styled(motion.footer)`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  margin-top: 1.063em;
  margin-bottom: 1.563em;
`
Card.Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.6;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 30px;
  }
`
interface IProjectCard {
  title: string
  image: string
  label: string
  id: string
}

export default function ProjectCard({ title, image, label, id }: IProjectCard) {
  const router = useRouter()
  return (
    <Card
      onClick={() => {
        router.push(`/projects/${id}`)
      }}
    >
      <Card.Content>
        <Card.Title>{title}</Card.Title>
        <Card.Footer>
          <Link href={`/projects/${id}`}>
            <a>
              <Button label={label} />
            </a>
          </Link>
        </Card.Footer>
      </Card.Content>
      <Card.Background
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        whileHover={{
          scale: 1.1
        }}
      >
        <img src={image} />
      </Card.Background>
    </Card>
  )
}
