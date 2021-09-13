import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="BIG"></div>
      <Component {...pageProps} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  if (cookie.get("name")) {
    return {
      redirect: {
        permanent: false,
        destination: "/chatRoom",
      },
    };
  }
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default MyApp;
