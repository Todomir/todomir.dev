import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr min(92ch, calc(100% - 64px)) 1fr;
  grid-column-gap: 32px;

  & > * {
    grid-column: 2;
  }

  .span-full {
    width: 100%;
    grid-column: 1 / -1;
  }
`

export default Container
