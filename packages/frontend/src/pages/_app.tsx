import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
// services
import App from 'components/PageLayout/App';
import { wrapper } from '../services/redux/store';
import { Router } from 'next/router';
import NProgress from 'nprogress';
// layout components
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {
  NProgress.configure({ showSpinner: false, minimum: 0.5 });
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <App cookies={pageProps.cookie}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/* @ts-ignore*/}
      <Component {...pageProps} />
    </App>
  );
}

export default wrapper.withRedux(MyApp);
