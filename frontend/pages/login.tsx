import React from "react";
import axios from "axios";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import Link from "next/link";

function login(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const [name, setName] = React.useState("");
  const [alert, setAlert] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  console.log(checked);

  const loginPost = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/users/${name}`);
      return true;
    } catch (error: any) {
      setAlert(error.response.data.message.message);
      return false;
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name) {
      const result = await loginPost();
      if (result) {
        cookie.set("name", name, {
          maxAge: checked ? 94670777 : 3600,
          sameSite: "none",
          secure: true,
        }); //1hour
        router.push(`/${name}`);
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
    <div>
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

  if (cookie.get("name")) {
    return {
      redirect: {
        permanent: false,
        destination: "/chatRoom",
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
