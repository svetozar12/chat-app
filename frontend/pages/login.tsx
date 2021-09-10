import React from "react";
import axios from "axios";
import { AppProps } from "next/dist/shared/lib/router/router";

function login({ data }: AppProps) {
  const [name, setName] = React.useState("");

  const loginPost = async () => {
    try {
      const res = await axios.post(`http://localhost:4001/users/${name}`, {
        username: name,
      });
      console.log(res);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginPost();
    setName("");
  };

  return (
    <form style={{ height: "100vh" }} className="container">
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
