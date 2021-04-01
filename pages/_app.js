import { ThemeProvider } from 'styled-components'
import {GlobalStyle, Theme } from "../theme";


export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
