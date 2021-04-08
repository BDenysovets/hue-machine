//import '../../styles/globals.css'
import { useState, useEffect, Fragment } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
)

function MyApp({ Component, pageProps }) {
  const classes = useStyles()

  const [blocking, setBlock] = useState(false)

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
          <Component {...pageProps} />

        <Backdrop className={classes.backdrop} open={blocking}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </Fragment>
  )
}

export default MyApp
