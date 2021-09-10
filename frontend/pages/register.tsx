import { AppProps } from "next/dist/shared/lib/router/router";
import axios from "axios";
import React from "react";

function register() {
  const [name, setName] = React.useState("");
  const [state, setState] = React.useState<any>({
    badAlert: "",
    goodAlert: "",
  });
  const registerPost = async () => {
    try {
      const res = await axios.post("http://localhost:4001/register", {
        username: name,
      });
      setState({ goodAlert: res.data.message });
      return true;
    } catch (error: any) {
      const temp = error.response.data;
      setState({ badAlert: temp.message.message });
      return false;
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await registerPost();
    setName("");
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
        <button onClick={handleSubmit} type="submit">
          register
        </button>
      </form>
    </>
  );
}
// export const getServerSideProps: any = async ({ res }: any) => {
//   try {
//     const res = await fetch("http://localhost:4001/users");
//     const data = await res.json();
//     return {
//       props: {
//         data: data,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };
export default register;
