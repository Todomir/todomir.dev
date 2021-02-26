import { AppProps } from 'next/app'
import Head from 'next/head'

import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Abner Rodrigues | Fullstack Developer</title>
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
      <GlobalStyle />
    </ThemeProvider>
  )
}
