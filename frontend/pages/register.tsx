import axios from "axios";
import React from "react";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useRouter } from "next/router";

import { IAlert } from "../interfaces/global";

function register(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");

  const [name, setName] = React.useState<string>("");
  const [loginPrompt, setLoginPrompt] = React.useState<Boolean>(false);
  const [state, setState] = React.useState<IAlert>({
    goodAlert: "",
    badAlert: "",
  });

  React.useEffect(() => {
    if (cookieName) {
      router.push(`/messages/${cookieName}`);
    }
  }, []);

  const quickLogin = () => {
    cookie.set("name", name, {
      maxAge: 7200,
      sameSite: "strict",
      path: "/",
    });
    router.push(`/messages/${cookieName}`);
  };

  const registerPost = async () => {
    try {
      const res = await axios.post("http://localhost:4001/users/register", {
        username: name,
      });
      const data = res.data;
      setState({ goodAlert: data.message });
      setLoginPrompt(true);
      return true;
    } catch (error: any) {
      const data = error.response.data;
      setName("");
      setState({ badAlert: data.message });
      return false;
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await registerPost();
    setTimeout(() => {
      setState({ badAlert: "", goodAlert: "" });
    }, 2000);
  };

  return (
    <>
      <form style={{ height: "100vh" }} className="container">
        <h2
          className="alert"
          style={state.goodAlert ? { color: "green" } : { color: "red" }}
        >
          {state.goodAlert || state.badAlert}
        </h2>
        <h1>Register</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="username"
          placeholder="username ..."
        />
        <Link href="/login">
          <a className="link" style={{ color: "var(--main-blue)" }}>
            Sign in
          </a>
        </Link>
        <button onClick={handleSubmit} type="submit">
          register
        </button>
        {loginPrompt && (
          <div
            onClick={quickLogin}
            style={{ cursor: "pointer" }}
            className="container quick_login"
          >
            <h2>Click me to Quick login</h2>
          </div>
        )}
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  const cookieName = cookie.get("name");
  if (cookieName) {
    return {
      redirect: {
        destination: `messages/${cookieName}`,
      },
    };
  }
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default register;
