import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="BIG"></div>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
