import styled from 'styled-components'

interface IFibonacciSpiral {
  width: number
  height: number
}

const Container = styled.section<IFibonacciSpiral>`
  display: grid;
  grid-gap: 0px;
  grid-template-rows: 8fr 1fr 1fr 3fr;
  grid-template-columns: 13fr 2fr 1fr 5fr;
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};

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
`

export default function FibonacciSpiral({ width, height }: IFibonacciSpiral) {
  return (
    <Container width={width} height={height}>
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
