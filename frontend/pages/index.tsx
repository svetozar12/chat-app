import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";

const index: NextPage<{ cookie: string }> = (props) => {
  const cookie = useCookie(props.cookie);
  return (
    <div style={{ height: "100vh" }} className="container">
      <Link href="http://localhost:3000/register">
        <a className="link blue_no_underline">
          <h2>Create an account !</h2>
        </a>
      </Link>
      <Link href="http://localhost:3000/login">
        <a className="link blue_no_underline">
          <h2>Already have a acount ?</h2>
        </a>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  const cookieName = cookie.get("name");
  if (cookieName) {
    return {
      redirect: {
        permanent: false,
        destination: `/messages/${cookieName}`,
      },
    };
  }

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default index;
