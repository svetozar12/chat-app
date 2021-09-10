import React from "react";
import axios from "axios";
import { AppProps } from "next/dist/shared/lib/router/router";

function login() {
  const [name, setName] = React.useState("");
  const [alert, setAlert] = React.useState("");

  const loginPost = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/users/${name}`);
      console.log(res);
    } catch (error: any) {
      setAlert(error.response.data.message.message);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name) {
      loginPost();
      setName("");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    } else {
      setAlert("No input");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    }
  };

  return (
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
  );
}

export default login;
