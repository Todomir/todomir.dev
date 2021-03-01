import getVariant from '@utils/helpers/animations/getVariant'
import home from '@utils/helpers/animations/home'

import { motion } from 'framer-motion'
import { down } from 'styled-breakpoints'
import styled from 'styled-components'

const Container = styled(motion.section)`
  display: grid;
  grid-gap: 0px;
  grid-template-rows: 8fr 1fr 1fr 3fr;
  grid-template-columns: 13fr 2fr 1fr 5fr;

  width: 1007px;
  height: 622px;

  margin-left: auto;
  margin-right: auto;

  ${down('xl')} {
    width: 735px;
    height: 453px;
  }

  ${down('lg')} {
    width: 735px;
    height: 453px;
  }

  -webkit-filter: drop-shadow(0px 24px 32px rgba(0, 0, 0, 0.05))
    drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.05))
    drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05))
    drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.05));

  filter: drop-shadow(0px 24px 32px rgba(0, 0, 0, 0.05))
    drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.05))
    drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05))
    drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.05));

  .box13 {
    grid-row: 1 / 5;
    background: #9bf9ff;
  }
  .box8 {
    grid-column: 2 / 5;
    background: #94d2ff;
  }
  .box5 {
    grid-row: 2 / 5;
    grid-column: 4 / 5;
    background: #76adff;
  }
  .box3 {
    grid-row: 4 / 5;
    grid-column: 2 / 4;
    background: #6b8cff;
  }
  .box2 {
    grid-row: 2 / 4;
    grid-column: 2 / 3;
    background: #5f6fff;
  }
  & > .box1 {
    background: #5350ff;
  }

  & > .box1 ~ .box1 {
    background: #4e31ff;
  }

  ${down('sm')} {
    height: 542px;
    width: 334.76px;

    grid-template-columns: 8fr 1fr 1fr 3fr;
    grid-template-rows: 13fr 2fr 1fr 5fr;

    .box13 {
      grid-column: 1 / 5;
      grid-row: 1;
    }

    .box8 {
      grid-row: 2 / 5;
      grid-column: 1 / 2;
    }

    .box5 {
      grid-column: 2 / 5;
      grid-row: 4 / 5;
    }

    .box3 {
      grid-column: 4 / 5;
      grid-row: 2 / 4;
    }

    .box2 {
      grid-column: 2 / 4;
      grid-row: 2 / 3;
    }

    & > .box1 {
      background: #5350ff;
    }

    & > .box1 ~ .box1 {
      background: #4e31ff;
    }
  }
`

interface IFibonacciSpiral {
  mounted: boolean
}

export default function FibonacciSpiral({ mounted }: IFibonacciSpiral) {
  return (
    <Container variants={getVariant(mounted, home.image)}>
      <div className="box13" />
      <div className="box8" />
      <div className="box5" />
      <div className="box3" />
      <div className="box2" />
      <div className="box1" />
      <div className="box1" />
    </Container>
  )
}
