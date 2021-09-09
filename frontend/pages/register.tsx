import { AppProps } from "next/dist/shared/lib/router/router";
import axios from "axios";
import React from "react";

function register({ data }: AppProps) {
  const [name, setName] = React.useState("");

  const postData = async () => {
    const res = await axios.post("http://localhost:4001/users", {
      username: name,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (name) {
      postData();
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
    return res.satus(400 || 404 || 500);
  }
};
export default register;
