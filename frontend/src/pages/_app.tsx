import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <div className="BIG"></div>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
