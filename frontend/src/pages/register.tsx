import React from "react";
import Link from "next/link";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../redux";

function register(props: { cookie: string }) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);

  const dispatch = useDispatch();
  const { registerPost } = bindActionCreators(actionCreators, dispatch);
  const alerts = useSelector((state: State) => state.userState);

  const [name, setName] = React.useState<string>("");
  const [loginPrompt, setLoginPrompt] = React.useState<Boolean>(false);
  const [state, setState] = React.useState<{
    goodAlert?: string;
    badAlert?: string;
  }>({
    goodAlert: alerts,
    badAlert: alerts,
  });

  React.useEffect(() => {
    console.log(alerts);
    if (registerPost) {
      console.log("GOOD");
      setState({ goodAlert: alerts });
    } else {
      console.log("BAD");
      setState({ badAlert: alerts });
    }
  }, [alerts]);

  React.useEffect(() => {
    if (cookie.get("name")) {
      router.push(`/${cookie.get("name")}`);
    }
  }, []);

  const quickLogin = () => {
    cookie.set("name", name, {
      maxAge: 7200,
      sameSite: "strict",
      path: "/",
    });
    router.push(`/${cookie.get("name")}`);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setName("");
    const register = await registerPost(name);
    if (register) {
      setLoginPrompt(true);
    }
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
        destination: `/${cookieName}`,
        permanent: false,
      },
    };
  }
  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default register;
