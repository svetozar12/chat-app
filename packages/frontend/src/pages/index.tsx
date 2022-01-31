import Link from "next/link";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { hostUrl } from "../utils/hostUrl_requestUrl";
import { getFirstChat } from "../utils/getFirstChat";
import styled from "@emotion/styled";

const Container = styled.div`
  height: 100vh;
  margin: 0;
  flex-direction: column;
`;
const LinkA = styled.a`
  color: var(--main-blue);
  text-decoration: none;
  cursor: pointer;
`;
const Home = () => {
  return (
    <Container className="flex">
      <Link href={`${hostUrl}/register`}>
        <LinkA>
          <h2>Create an account !</h2>
        </LinkA>
      </Link>
      <Link href={`${hostUrl}/login`}>
        <LinkA>
          <h2>Already have a acount ?</h2>
        </LinkA>
      </Link>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  const chatInstance: any = await getFirstChat(cookie.get("name"));
  if (cookie.has("name") && cookie.has("token")) {
    return {
      redirect: {
        destination: `/${chatInstance._id}`,
        permanent: false,
      },
    };
  }
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default Home;
