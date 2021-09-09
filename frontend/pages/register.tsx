import { AppProps } from "next/dist/shared/lib/router/router";
import axios from "axios";
import React from "react";

function register({ data }: AppProps) {
  const [name, setName] = React.useState("");

  const registerPost = async () => {
    try {
      await axios.post("http://localhost:4001/register", {
        username: name,
      });
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (name) {
      e.preventDefault();
      registerPost();
      console.log("submit");
      setName("");
    }
  };
  return (
    <>
      <form style={{ height: "100vh" }} className="container">
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
