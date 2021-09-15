import { GetServerSideProps, NextPage } from "next";
import { useCookie } from "next-cookie";

const contacts: NextPage<{ cookie: string }> = (props) => {
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");
  return (
    <div className="contacts">
      <h1>{cookieName}</h1>
      <p>Messages</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default contacts;
