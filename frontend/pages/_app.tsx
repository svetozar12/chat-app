import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { FC } from "react";

const MyApp = ({ Component, pageProps }: AppProps, props) => {
  const cookie = useCookie(props.cookie);
  return (
    <>
      <div className="BIG"></div>
      <Component {...pageProps} cookie={cookie} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default MyApp;
