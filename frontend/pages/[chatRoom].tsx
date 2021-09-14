// import { NextPage } from "next";
// import React, { useState, useEffect, ChangeEvent } from "react";
// import { io, Socket } from "socket.io-client";
// import { useCookie } from "next-cookie";
// import { GetServerSideProps } from "next";
// import { AppProps } from "next/dist/shared/lib/router/router";
// import { useRouter } from "next/router";
// import axios from "axios";

// interface IProps {
//   name: string;
//   message: string;
// }

// const Home: NextPage = (props: AppProps) => {
//   const router = useRouter();
//   const cookie = useCookie(props.cookie);
//   const [state, setState] = useState<IProps>({
//     name: cookie.get("name"),
//     message: "",
//   });
//   const [chat, setChat] = useState<string[] | []>([]);
//   const [socketRef, setSocketRef] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketConnect: Socket = io.connect("http://localhost:4000");
//     socketConnect.on("message", ({ name, message }: any) => {
//       setChat([...chat, { name, message }]);
//     });
//     setSocketRef(socketConnect);
//     return () => socketRef && socketRef.disconnect();
//   }, []);

//   useEffect(() => {
//     if (socketRef) {
//       socketRef.on("message", ({ name, message }: any) => {
//         setChat([...chat, { name, message }]);
//         console.log(chat);
//       });
//     }
//   }, [chat]);

//   const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     setState({ ...state, [e.target.name]: e.target.value });
//   };

//   const onMessageSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
//     e.preventDefault();
//     const { name, message } = state;
//     socketRef?.emit("message", { name, message });
//     setState({ name, message: "" });
//   };

//   const checkForCookies = () => {
//     if (!cookie.get("name")) {
//       router.push("/");
//     }
//   };

//   React.useEffect(() => {
//     checkForCookies();
//   }, []);

//   const deleteUser = async () => {
//     try {
//       const res = await axios.delete(`http://localhost:4001/${state.name}`);
//       router.push("/");
//       cookie.remove("name");
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };

//   const deleteCookies = () => {
//     if (cookie.has("name")) {
//       cookie.remove("name");
//       router.push("/");
//     }
//   };

//   const renderChat = () => {
//     return chat.map(({ name, message }, index: number) => (
//       <div className={cookie.get("name") ? "true" : "false"} key={index}>
//         <h2>{name}: </h2>
//         <p>{message}</p>
//       </div>
//     ));
//   };
//   return (
//     <div style={{ zIndex: "10", position: "relative" }} className="container">
//       <h1>You're logged in as {state.name}</h1>
//       <h2 className="log-out" onClick={deleteCookies}>
//         Log out
//       </h2>
//       <h2 className="log-out" onClick={deleteUser}>
//         Delete account
//       </h2>
//       <div className="container-chat">
//         <h2>Welcome to my chat app</h2>
//         {renderChat()}
//       </div>

//       <form>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <input
//             style={{ width: "100%", textAlign: "center" }}
//             type="text"
//             name="message"
//             onChange={(e) => onTextChange(e)}
//             value={state.message}
//             placeholder="Your Message "
//           />
//         </div>
//         <button onClick={onMessageSubmit}>
//           <strong>Send message</strong>
//         </button>
//       </form>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const cookie = useCookie(context);

//   return {
//     props: { cookie: context.req.headers.cookie || "" },
//   };
// };

// export default Home;

import { NextPage } from "next";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { io, Socket } from "socket.io-client";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import axios from "axios";

interface IProps {
  name: string | string[];
  message: string | string[];
}

const Home: NextPage = (props: AppProps) => {
  const router = useRouter();
  const { chatRoom } = router.query;
  const cookie = useCookie(props.cookie);
  const [state, setState] = useState<IProps>({
    name: cookie.get("name"),
    message: "",
  });
  const [chat, setChat] = useState<string[] | []>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const ws: Socket = io.connect("http://localhost:4000");
    socketRef.current = ws;
    ws.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
      console.log(chat);
    });
    return () => ws.disconnect();
  }, [chat]);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { name, message } = state;
    if (message) {
      socketRef.current.emit("message", { name, message });
      setState({ name: name, message: "" });
    }
  };

  const checkForCookies = () => {
    if (!cookie.has("name")) {
      console.log("no cookie");
      router.push("/");
    }
  };

  React.useEffect(() => {
    checkForCookies();
  }, []);

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`http://localhost:4001/${state.name}`);
      router.push("/");
      cookie.remove("name");
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteCookies = () => {
    if (cookie.has("name")) {
      cookie.remove("name");
      router.push("/");
    }
  };

  const renderChat = (): JSX.Element | JSX.Element[] => {
    let today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    console.log(Date.now());

    console.log(hours + "." + minutes);

    return chat.map(({ name, message }, index) => (
      <div className={chatRoom === name ? "its me" : "its not me"} key={index}>
        <h2>{name} </h2>
        <div style={{ display: "flex" }}>
          <p>{message}</p>
          <p style={{ float: "right" }}>
            {hours}:{minutes}
          </p>
        </div>
      </div>
    ));
  };
  return (
    <div className="container chat_app">
      <h1>You're logged in as {chatRoom}</h1>
      <h2 className="log-out" onClick={deleteCookies}>
        Log out
      </h2>
      <h2 className="log-out" onClick={deleteUser}>
        Delete account
      </h2>
      <div className="container-chat">
        <h2>Welcome to my chat app</h2>
        {renderChat()}
      </div>

      <form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            style={{ width: "100%", textAlign: "center" }}
            type="text"
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            placeholder="Your Message "
          />
        </div>
        <button onClick={onMessageSubmit}>
          <strong>Send message</strong>
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default Home;

// https://stackoverflow.com/questions/58432076/websockets-with-functional-components
