import Image from 'next/image'

import { Heading, Highlight, Text } from '@components/atoms'

import { ProblemContainer } from './styles'

export default function Problem() {
  return (
    <ProblemContainer className="span-full">
      <ProblemContainer.Content>
        <article>
          <Heading mw={15}>
            It can be really hard to make things{' '}
            <Highlight strong>happen.</Highlight>
          </Heading>
          <Text>
            Spending hours trying to do stuff on your own is incredibly
            stressful, especially when you’re not really tech savvy.
          </Text>
          <Text>
            Sometimes you just want time to worry about your ideas, instead of
            messing around with tool, after tool, after tool, after tool...
          </Text>
          <Text>You get the point.</Text>
        </article>
        <ProblemContainer.Aside>
          <Image
            width={600}
            height={700}
            objectFit="contain"
            src="/images/problem-image.svg"
            alt="Drawing of people floating around a big lightbulb, a metaphor for ideas"
          />
        </ProblemContainer.Aside>
      </ProblemContainer.Content>
    </ProblemContainer>
  )
}
