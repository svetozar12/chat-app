import ImputComponet from "../components/ImputComponet";
import { AppProps } from "next/dist/shared/lib/router/router";

function login({ data }: AppProps) {
  return (
    <>
      {data.map((item: any) => {
        return (
          <ImputComponet
            input="login"
            key={item._id}
            {...item}
            register={false}
          />
        );
      })}
    </>
  );
}
export const getServerSideProps: any = async () => {
  try {
    const res = await fetch("http://localhost:4001/users");
    const data = await res.json();
    return {
      props: {
        data: data,
        statusRegister: res.toString(),
      },
    };
  } catch (error) {
    console.log(error);
  }
};
export default login;
