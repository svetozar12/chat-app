import ImputComponet from "../components/ImputComponet";
import { GetServerSideProps } from "next";
import { AppContext } from "next/app";
import { AppProps } from "next/dist/shared/lib/router/router";

function login({ data }: AppProps) {
  return (
    <>
      {data.map((item: any) => {
        return <ImputComponet input="login" key={item._id} {...item} />;
      })}
    </>
  );
}
export const getServerSideProps: any = async () => {
  const res = await fetch("http://localhost:4001/users");
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
export default login;
