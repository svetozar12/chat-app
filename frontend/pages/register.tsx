import { AppProps } from "next/dist/shared/lib/router/router";
import axios from "axios";
import React from "react";

function register({ data }: AppProps) {
  const [name, setName] = React.useState("");

  const registerPost = async () => {
    const res = await axios.post("http://localhost:4001/users", {
      username: name,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (name) {
      registerPost();
      console.log("submit");
      e.preventDefault();
      setName("");
    }
  };
  return (
    <>
      <form
        action="http://localhost:4001/users"
        method="POST"
        style={{ height: "100vh" }}
        className="container"
      >
        <h1>Register</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="username"
          placeholder="username ..."
        />
        <button onClick={handleSubmit} type="submit">
          register
        </button>
      </form>
    </>
  );
}
export const getServerSideProps: any = async ({ res }: any) => {
  try {
    const res = await fetch("http://localhost:4001/users");
    const data = await res.json();
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
export default register;
