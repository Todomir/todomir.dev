import { AppProps } from 'next/app'
import Head from 'next/head'

import MountedProvider from '@context/MountedContext'

import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <MountedProvider>
        <Head>
          <title>Abner Rodrigues | Fullstack Developer</title>
        </Head>
        <AnimatePresence exitBeforeEnter>
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
        <GlobalStyle />
      </MountedProvider>
    </ThemeProvider>
  )
}
