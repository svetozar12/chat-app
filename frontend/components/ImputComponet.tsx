import React from "react";
import * as mongoose from "mongoose";
import { useRouter } from "next/dist/client/router";

function ImputComponet({ input, username, register }: any) {
  const [name, setName] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { username }: any = name;
    e.preventDefault();
  };

  // const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (
  //     name.toLocaleLowerCase() !== username.toLocaleLowerCase() &&
  //     name === ""
  //   ) {
  //     setTimeout(() => {
  //       router.push("/404");
  //     }, 100);
  //   } else {
  //     setTimeout(() => {
  //       router.push("/chatRoom");
  //     }, 100);
  //   }
  //   e.preventDefault();
  // };

  // const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (
  //     name.toLocaleLowerCase() !== username.toLocaleLowerCase() &&
  //     name !== ""
  //   ) {
  //     setTimeout(() => {
  //       router.push("/chatRoom");
  //     }, 100);
  //   } else {
  //     setTimeout(() => {
  //       router.push("/404");
  //     }, 100);
  //   }
  //   e.preventDefault();
  // };
  return (
    <form
      action="/users"
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
        {input}
      </button>
    </form>
  );
}

export default ImputComponet;
