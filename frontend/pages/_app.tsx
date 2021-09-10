import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="BIG"></div>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
