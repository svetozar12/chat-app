import Link from "next/link";
import { useCookie } from "next-cookie";
<<<<<<< HEAD
import { GetServerSideProps, NextPage } from "next";

const index: NextPage<{ cookie: string }> = (props) => {
  const cookie = useCookie(props.cookie);
  const router = useRouter();
  const cookieName = cookie.get("name");

=======
import { GetServerSideProps } from "next";
const index = () => {
>>>>>>> invites-ws-fix
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
<<<<<<< HEAD

=======
  if (cookieName) {
    return {
      redirect: {
        destination: `messages/${cookieName}`,
        permanent: false,
      },
    };
  }
>>>>>>> invites-ws-fix
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default index;
