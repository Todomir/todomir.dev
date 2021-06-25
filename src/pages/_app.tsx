import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

import '@fontsource/sora/variable.css'
import 'modern-normalize/modern-normalize.css'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Abner Rodrigues | Fullstack Developer</title>
      </Head>
      <Component key={router.route} {...pageProps} />
      <GlobalStyle />
      <Script src="https://cdn.jsdelivr.net/gh/scottkellum/typetura.js@master/js/typetura.min.js" />
    </ThemeProvider>
  )
}
