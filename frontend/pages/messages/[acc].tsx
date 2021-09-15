import Link from "next/link";
import React from "react";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";

import axios from "axios";
const index: NextPage<{ cookie: string }> = (props) => {
  const cookie = useCookie(props.cookie);
  const [contacts, setContacts] = React.useState([]);

  return (
    <div style={{ height: "100vh" }} className="container">
      <h1>You're logged in as {cookie.get("name")}</h1>
      <ul>
        <div className="contacts">
          <h1>{cookie.get("name")}</h1>
          <p>Messages</p>
        </div>
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  const cookieName = cookie.get("name");

  if (cookieName) {
    try {
      const res = await axios.get(`http://localhost:4001/users/${cookieName}`);
    } catch (error) {
      cookie.remove("name");
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  if (!cookieName) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default index;
