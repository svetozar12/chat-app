import React from "react";
import axios from "axios";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";

function login(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const [name, setName] = React.useState("");
  const [alert, setAlert] = React.useState("");

  const loginPost = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/users/${name}`);
      console.log(res);
      return true;
    } catch (error: any) {
      console.log(error);
      setAlert(error.response.data.message.message);
      return false;
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name) {
      const result = await loginPost();
      if (result) {
        cookie.set("name", name);
        router.push("/chatRoom");
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
      console.log(name);
    } else {
      setAlert("No input");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    }
  };

  return (
    <>
      <h1>
        <form style={{ height: "100vh" }} className="container">
          <h1 style={{ color: "red" }}>{alert}</h1>
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
      </h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default login;
