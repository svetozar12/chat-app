import axios from "axios";
import React from "react";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useRouter } from "next/router";

function register(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");

  const [name, setName] = React.useState<string>("");
  const [loginPrompt, setLoginPrompt] = React.useState<Boolean>(false);
  const [state, setState] = React.useState<string | any>({
    badAlert: "",
    goodAlert: "",
  });

  const quickLogin = () => {
    cookie.set("name", name, { maxAge: 3600 });
    router.push(`/messages/${cookieName}`);
  };

  const registerPost = async () => {
    try {
      const res = await axios.post("http://localhost:4001/register", {
        username: name,
      });
      setState({ goodAlert: res.data.message });
      setLoginPrompt(true);
      return true;
    } catch (error: any) {
      const temp = error.response.data;
      setName("");
      setState({ badAlert: temp.message.message });
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

  React.useEffect(() => {
    if (cookie.has("name")) {
      console.log(cookie.get("name"));

      useRouter().push(`http://localhost:3000/messages/`);
    }
  }, []);
  return (
    <>
      <form style={{ height: "100vh" }} className="container">
        <h1 style={state.goodAlert ? { color: "green" } : { color: "red" }}>
          {state.goodAlert || state.badAlert}
        </h1>
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
            className="container"
          >
            <h1>Click me to Quick login</h1>
          </div>
        )}
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  const cookieName = cookie.has("name");

  if (cookieName) {
    console.log("yes");

    return {
      redirect: {
        permanent: false,
        destination: `/messages/${cookieName}`,
      },
    };
  }
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default register;
