import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import Link from "next/link";
// utils
import api_helper from "services/graphql/api_helper";
import { getAuth } from "utils/authMethods";
import { css } from "@emotion/css";
import { Link as ALink, useColorModeValue, VStack } from "@chakra-ui/react";
// icons
import { IoMdLogOut } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import useThemeColors from "hooks/useThemeColors";

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

  const {
    colors: { from_bg },
  } = useThemeColors();
  return (
    <VStack
      w={{ base: "15rem", lg: "15rem" }}
      pos="absolute"
      justifyContent="center"
      align="center"
      bg={from_bg}
      textAlign="left"
      top={0}
      right={0}
      m={0}
      pt={2}
      pb={2}
      zIndex={2000}
      transform="translate(-4px, 75px)"
      boxShadow=" 2px 2px 22px 1px var(--main-box-shadow)"
    >
      {Render.map((element, index) => {
        const { href, onClick, Icon, title } = element;

        return (
          <Link key={index} href={href} passHref>
            <ALink
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              textAlign="start"
              w="full"
              my="0 !important"
              py="2"
              fontSize={{ base: "1.4rem", md: "3vw", lg: "2vw", xl: "1vw" }}
              _hover={{ bg: "hover_bg" }}
              onClick={onClick}
            >
              <Icon className={buttonStyles} />
              {title}
            </ALink>
          </Link>
        );
      })}
    </VStack>
  );
}

export default UserSettings;
