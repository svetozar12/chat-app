import Link from "next/link";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";

function index() {
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
        destination: "/chatRoom",
      },
    };
  }

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default index;
