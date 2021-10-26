import React from "react";
import Link from "next/link";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../redux";

function login(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const [name, setName] = React.useState<string>("");
  const [alert, setAlert] = React.useState<string>("");
  const [checked, setChecked] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const { loginPost } = bindActionCreators(actionCreators, dispatch);
  const alerts = useSelector((state: State) => state.userState);

  React.useEffect(() => {
    setAlert(alerts);
  }, [alerts]);
  const RemoveAlert = () => {
    setAlert(alerts);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name) {
      setName("");
      const login = await loginPost(name);
      if (login) {
        cookie.set("name", name, {
          maxAge: checked ? 94670777 : 3600,
          sameSite: "strict",
          path: "/",
        });
        setTimeout(() => {
          router.push(`/${cookie.get("name")}`);
        }, 100);
      } else {
        RemoveAlert();
      }
    } else {
      setAlert("No input");
      RemoveAlert();
    }
  };

  return (
    <div>
      <form style={{ height: "100vh" }} className="container">
        <h1 className="alert" style={{ color: "red" }}>
          {alert}
        </h1>
        <h1>Login</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="username"
          placeholder="username ..."
        />
        <div className="clickable">
          <Link href="/register">
            <a className="link" style={{ color: "var(--main-blue)" }}>
              Sign up
            </a>
          </Link>
          <label htmlFor="checkbox">
            {" "}
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => setChecked(e.target.checked)}
              style={{ width: "20px", height: "40px" }}
            />
            Remember me
          </label>
        </div>
        <button onClick={handleSubmit} type="submit">
          login
        </button>
      </form>
    </div>
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
    props: {
      cookie: context.req.headers.cookie || "",
    },
  };
};

export default login;
