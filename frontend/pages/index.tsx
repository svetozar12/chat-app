import Link from "next/link";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";

function index(props: AppProps) {
  const cookie = useCookie(props.cookie);
  return (
    <div style={{ height: "100vh" }} className="container">
      <Link href="http://localhost:3000/register">
        <a
          className="home"
          style={{ textDecoration: "none", color: "var(--main-blue)" }}
        >
          <h1>Create an account !</h1>
        </a>
      </Link>
      <Link href="http://localhost:3000/login">
        <a
          className="home"
          style={{ textDecoration: "none", color: "var(--main-blue)" }}
        >
          <h1>Already have a acount ?</h1>
        </a>
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default index;
