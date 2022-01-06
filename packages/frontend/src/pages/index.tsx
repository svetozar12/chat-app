import Link from "next/link";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { hostUrl } from "../utils/hostUrl_requestUrl";
const Home = () => {
  return (
    <div style={{ height: "100vh" }} className="container">
      <Link href={`${hostUrl}/register`}>
        <a className="link blue_no_underline">
          <h2>Create an account !</h2>
        </a>
      </Link>
      <Link href={`${hostUrl}/login`}>
        <a className="link blue_no_underline">
          <h2>Already have a acount ?</h2>
        </a>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);

  if (cookie.has("name") && cookie.has("token")) {
    return {
      redirect: {
        destination: `/${cookie.get("name")}`,
        permanent: false,
      },
    };
  }
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default Home;
