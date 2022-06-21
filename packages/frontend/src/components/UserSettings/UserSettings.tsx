import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { IoMdLogOut } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { useCookie } from "next-cookie";
import api_helper from "../../services/graphql/api_helper";
import { getAuth } from "../../utils/authMethods";

export const User_settings = styled.div`
  width: 10rem;
  padding: 1rem;
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
  transform: translate(-3px, 67px);
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

function UserSettings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookie = useCookie();
  const deleteCookies = async () => {
    getAuth();
    const cookies = cookie.getAll();
    await api_helper.auth.logout(cookie.get("id"), cookie.get("token"));
    for (const key in cookies) cookie.remove(key);

    router.push("/");
    dispatch({ type: "SIGN_OUT" });
  };

  const deleteUser = async () => {
    try {
      getAuth();
      await api_helper.user.delete(cookie.get("id"), cookie.get("token"));
      deleteCookies();
      return true;
    } catch (error) {
      return false;
    }
  };

  const Render = [
    {
      href: "/settings/profile",
      onClick: () => {
        dispatch({ type: "SET_USER_SETTINGS", payload: false });
      },
      Icon: FiSettings,
      title: "User settings",
    },
    {
      href: "#",
      onClick: deleteCookies,
      Icon: IoMdLogOut,
      title: "Log out",
    },
    {
      href: "#",
      onClick: deleteUser,
      Icon: RiDeleteBin6Fill,
      title: " Delete user",
    },
  ];

  return (
    <User_settings data-testid="user_settings">
      {Render.map((element, index) => {
        const { href, onClick, Icon, title } = element;

        return (
          <Link key={index} href={href} passHref>
            <a className={User_settings_style} onClick={onClick}>
              <Icon className={buttonStyles} />
              {title}
            </a>
          </Link>
        );
      })}
    </User_settings>
  );
}

export default UserSettings;
