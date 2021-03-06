import React from "react";
import { requestUrl } from "../../utils/hostUrl_requestUrl";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { IoMdLogOut } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
export const User_settings = styled.div`
  width: 10rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: var(--main-white) !important;
  border-radius: 5px !important;
  text-align: left;
  top: 0;
  right: 0;
  margin: 0;
  z-index: 12;
  transform: translate(0px, 67px);
  box-shadow: 2px 2px 22px 1px var(--main-box-shadow);
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    background: var(--main-white);
    right: 14px;
    top: -10px;
    transform: rotate(45deg);
    z-index: 1;
  }
  @media (min-width: 1008px) {
    width: 15rem;
  }
`;

export const User_settings_style = css`
  display: flex;
  align-items: center;
  color: black;
  margin: 0 0.3rem;
  border-radius: 5px;
  padding: 1rem 0.3rem;
  width: 98%;
  font-size: 1.2vw;
  cursor: pointer;
  &:hover {
    background: rgba(122, 122, 122, 0.3);
  }
`;

const buttonStyles = css`
  margin: 0 1rem;
  border-radius: unset;
  width: 1.5rem;
  height: 1.5rem;
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
      <Link href="/settings/profile" passHref>
        <a
          className={User_settings_style}
          style={{ marginTop: "1rem" }}
          onClick={() => {
            dispatch({ type: "SET_USER_SETTINGS", payload: false });
          }}
        >
          <FiSettings className={buttonStyles} />
          User settings
        </a>
      </Link>
      <Link href="#" passHref>
        <a className={User_settings_style} onClick={deleteCookies}>
          <IoMdLogOut className={buttonStyles} />
          Log out
        </a>
      </Link>
      <Link href="#" passHref>
        <a className={User_settings_style} style={{ marginBottom: "1rem" }} onClick={deleteUser}>
          <RiDeleteBin6Fill className={buttonStyles} />
          Delete user
        </a>
      </Link>
    </User_settings>
  );
}

export default UserSettings;
