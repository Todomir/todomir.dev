import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const Container = styled.div`
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inconsolata', monospace;
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};

  span {
    margin-left: 0.375rem;
  }
`

export const Title = styled.h1`
  text-align: center;
  font-weight: 900;
  font-size: 9.313rem;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.05em;
  background: linear-gradient(
    192.26deg,
    #37ecba 28.42%,
    #17e9d0 51.65%,
    #00dcea 71.43%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 10px 20px rgba(55, 236, 186, 0.18),
    0px 2px 6px rgba(55, 236, 186, 0.12), 0px 0px 1px rgba(0, 0, 0, 0.04);

  ${down('sm')} {
    font-size: 6rem;
  }
`

export const Content = styled.section`
  margin-top: 1.875rem;
  text-align: center;
  font-family: 'Inconsolata', monospace;
  font-weight: 700;
  font-size: 1rem;

  a {
    background: linear-gradient(
      192.26deg,
      #37ecba 28.42%,
      #17e9d0 51.65%,
      #00dcea 71.43%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 10px 20px rgba(55, 236, 186, 0.18),
      0px 2px 6px rgba(55, 236, 186, 0.12), 0px 0px 1px rgba(0, 0, 0, 0.04);
  }

  ${down('sm')} {
    font-size: 0.85rem;
  }
`
