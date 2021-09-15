import Link from "next/link";
import React from "react";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import axios from "axios";
const index: NextPage<{ cookie: string }> = (props) => {
  const router = useRouter();

  const cookie = useCookie(props.cookie);
  const [contacts, setContacts] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4001/users");
      setContacts(response.data.users);
    } catch (error) {
      return false;
    }
  };

  const deleteCookies = () => {
    if (cookie.get("name")) {
      cookie.remove("name");
      router.push("/");
    }
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4001/${cookie.get("name")}`,
      );
      deleteCookies();
      return true;
    } catch (error) {
      return false;
    }
  };

  const validateUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/users/${cookie.get("name")}`,
      );
      return true;
    } catch (error) {
      deleteCookies();
      return false;
    }
  };
  React.useEffect(() => {
    validateUser();
    fetchUsers();
  }, []);

  console.log("my arr", contacts);

  return (
    <div
      style={{ height: "100vh", justifyContent: "flex-start" }}
      className="container"
    >
      <h1>You're logged in as {cookie.get("name")}</h1>
      <h2 className="log-out" onClick={deleteCookies}>
        Log out
      </h2>
      <h2 className="log-out" onClick={deleteUser}>
        Delete account
      </h2>
      <ul style={{ overflowY: "auto", overflowX: "hidden" }}>
        {contacts.map((item) => {
          const { _id, username } = item;
          return (
            <a
              style={{
                color: "var(--main-white)",
                textDecoration: "none",
              }}
              href="http://localhost:3000/messages/chatRoom"
            >
              {username !== cookie.get("name") && (
                <div className="contacts">
                  <h1>{username}</h1>
                  <p>Messages</p>
                </div>
              )}
            </a>
          );
        })}
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
