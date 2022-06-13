import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
// services
import { wrapper } from "../services/redux/store";
import App from "../components/App";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  return <App Component={Component} pageProps={pageProps} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(context);
  if (!cookie.has("name")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookie: context.req.headers.cookie || "",
      chatRoom: context.query,
    },
  };
};

export default wrapper.withRedux(MyApp);
