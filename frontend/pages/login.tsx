import React from "react";
import axios from "axios";
// import { useRouter } from "next/dist/client/router";
import { AppProps } from "next/dist/shared/lib/router/router";

function login({ data }: AppProps) {
  const [name, setName] = React.useState("");
  const url = `http://localhost:4001/users/${name}`;
  // const router = useRouter();

  const loginPost = async () => {
    return await axios.post(url, {
      username: name,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (name) {
      loginPost();
      e.preventDefault();
      setName("");
    }
  };

  return (
    <form method="GET" style={{ height: "100vh" }} className="container">
      <h1>Login</h1>
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
