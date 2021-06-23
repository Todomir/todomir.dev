import { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

import '@fontsource/sora/variable.css'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Abner Rodrigues | Fullstack Developer</title>
      </Head>
      <Component key={router.route} {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  )
}
