import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="font-roboto">
        <Main />
        <NextScript />
        <Script src="/__env.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
