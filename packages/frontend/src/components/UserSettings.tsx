import React from "react";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

const User_settings = styled.div`
  width: auto;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background: var(--main-white);
  text-align: left;
  left: 0;
  margin: 0 1rem;
  box-shadow: 0 0 10px black;
`;

const User_settings_anchor = styled.a`
  color: black;
  margin: 1rem;
  width: 100%;
  font-size: 1.2vw;
  cursor: pointer;
  &:hover {
    color: rgba(122, 122, 122, 1);
  }
`;
function UserSettings({ cookie }: { cookie: any }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const deleteCookies = () => {
    cookie.remove("name");
    cookie.remove("token");
    cookie.remove("refresh_token");
    router.push("/");
    dispatch({ type: "SIGN_OUT" });
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${requestUrl}/users/${cookie.get("name")}`);

      deleteCookies();
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <User_settings data-testid="user_settings">
      <Link href="/settings/profile">
        <User_settings_anchor
          onClick={() => {
            dispatch({ type: "SET_USER_SETTINGS", payload: false });
          }}
        >
          User settings
        </User_settings_anchor>
      </Link>
      <Link href="#">
        <User_settings_anchor onClick={deleteCookies}>
          Log out
        </User_settings_anchor>
      </Link>
      <Link href="#">
        <User_settings_anchor onClick={deleteUser}>
          Delete user
        </User_settings_anchor>
      </Link>
    </User_settings>
  );
}

export default UserSettings;
