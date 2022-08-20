import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
// services
import App from 'components/PageLayout/App';
import { wrapper } from '../services/redux/store';
// layout components

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}

export default wrapper.withRedux(MyApp);
