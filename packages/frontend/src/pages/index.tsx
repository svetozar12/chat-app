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
  margin: 1rem;
  font-weight: bold;
  font-size: 2.5rem;
`;
const Home = () => {
  return (
    <Container className="flex">
      <LinkA href={`${hostUrl}/register`}>Create an account !</LinkA>
      <LinkA href={`${hostUrl}/login`}>Already have a acount ?</LinkA>
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
