import React from "react";
import { useCookie } from "next-cookie";
import axios from "axios";
const ActiveChats = ({
  reciever,
  inviter,
  status,
  cookie,
}: {
  reciever: string;
  inviter: string;
  status: string;
  cookie: string;
  get: () => void;
}) => {
  const cokie = useCookie(cookie);

  const [width, setWidth] = React.useState<number | null>(null);
  React.useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return window.removeEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);
  // const sendInvite = async () => {
  //   try {
  //     const res = await axios.post(`http://localhost:4001/invites`, {
  //       inviter: reciever,
  //       reciever: inviter,
  //       status: "accepted",
  //     });
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  React.useEffect(() => {
    // sendInvite();
    // get();
  }, []);

  return <p>{inviter === cokie.get("name") ? reciever : inviter}</p>;
};
export default ActiveChats;
