import { useState, useEffect, Fragment } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import theme from '../theme';
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import { Layout } from '../components/layout';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [open, setOpen] = useState(false);

  Router.events.on('routeChangeStart', () => setOpen(true));
  Router.events.on('routeChangeComplete', () => setOpen(false));
  Router.events.on('routeChangeError', () => setOpen(false));

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>RPM-Admin</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Backdrop style={{ color: '#fff', zIndex: useTheme().zIndex.drawer + 1 }} open={open}>
            <CircularProgress color='inherit' />
          </Backdrop>
        </ThemeProvider>
      </SessionProvider>
    </Fragment>
  );
}

export default MyApp;
