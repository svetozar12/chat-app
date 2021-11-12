import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="BIG"></div>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
