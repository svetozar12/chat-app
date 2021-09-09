import React from "react";
import { useRouter } from "next/dist/client/router";
import { AppProps } from "next/dist/shared/lib/router/router";

function login({ data }: AppProps) {
  const [name, setName] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <form style={{ height: "100vh" }} className="container">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="username"
        placeholder="username ..."
      />
      <button onClick={handleSubmit} type="submit">
        login
      </button>
    </form>
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
