import React from "react";
import api_helper from "../../../services/graphql/api_helper";
import { css } from "@emotion/css";
import { useCookie } from "next-cookie";
import { Image, Box } from "@chakra-ui/react";
import s from "./Single_avatar.module.css";

function Single_avatar({
  width,
  height,
  overlay,
  group,
  preview,
}: {
  width?: string;
  height?: string;
  overlay?: boolean;
  group?: boolean;
  preview?: string;
}) {
  const [image, setImage] = React.useState<string>("");
  const cookie = useCookie();

  const getUserImage = async () => {
    try {
      const res = await api_helper.user.getById(cookie.get("id"), cookie.get("token"));
      const userAvatar = res.userAvatar;

      const requestString = `${userAvatar}`;
      setImage(requestString);
      return true;
    } catch (error) {
      return false;
    }
  };

  (() => {
    getUserImage();
  })();

  return (
    <>
      {preview ? (
        <Box resize="none" w={width || "3.5rem"} h={height || "3.5rem"} color="var(--main-logo-color)" zIndex={overlay ? 1 : 0}>
          <Image src={image} className={`${group ? s.GroupLogo : s.SignleLogo} `} />
        </Box>
      ) : (
        <Box resize="none" zIndex={overlay ? 1 : 0}>
          <Image
            src={image}
            className={`${
              group
                ? s.GroupLogo
                : css`
                    border-radius: 100%;
                    margin: 0;
                    width: ${width || "3.5rem"};
                    height: ${height || "3.5rem"};
                    color: var(--main-logo-color);
                    ${overlay ? "bottom: 0;" : "top:0"}
                    ${overlay ? "left: 0;" : "right:0"}
                  `
            } `}
          />
        </Box>
      )}
    </>
  );
}

export default Single_avatar;
