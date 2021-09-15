import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";

function index(props: AppProps) {
  const cookie = useCookie(props.cookie);
  // React.useEffect(() => {
  //   if (cookie.get("name")) {
  //     useRouter().push("/chatRoom");
  //   }
  // }, []);
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  if (cookie.get("name")) {
    return {
      redirect: {
        permanent: false,
        destination: `/${cookie.get("name")}`,
      },
    };
  }

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default index;
