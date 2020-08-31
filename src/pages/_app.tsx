//import '../../styles/globals.css'
import { useState, useEffect, Fragment } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'

function MyApp({ Component, pageProps }) {

  const [blocking, setBlock] = useState(false);

  Router.events.on('routeChangeStart', () => setBlock(true))
  Router.events.on('routeChangeComplete', () => setBlock(false))
  Router.events.on('routeChangeError', () => setBlock(false))

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>RPM-Admin</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BlockUi tag="div" blocking={blocking}>
          <Component {...pageProps} />
        </BlockUi>
      </ThemeProvider>
    </Fragment>
  )
}

export default MyApp
