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

  const [name, setName] = React.useState("");
  const [loginPrompt, setLoginPrompt] = React.useState(false);
  const [state, setState] = React.useState<any>({
    badAlert: "",
    goodAlert: "",
  });

  const quickLogin = async () => {
    router.push("/chatRoom");
    cookie.set("name", name, { maxAge: 360 });
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
          <div className="container">
            <h1 onClick={quickLogin} style={{ cursor: "pointer" }}>
              Click me to Quick login
            </h1>
          </div>
        )}
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  if (cookie.get("name")) {
    return {
      redirect: {
        permanent: false,
        destination: "/chatRoom",
      },
    };
  }
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default register;
