import React from "react";
import api_helper from "../../../services/graphql/api_helper";
import { css } from "@emotion/css";
import { useCookie } from "next-cookie";
import { Image } from "@chakra-ui/react";
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

  const FallBackImage =
    "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";

  return (
    <>
      {preview ? (
        <Image
          borderRadius="100%"
          w={width || "3.5rem"}
          h={height || "3.5rem"}
          color="var(--main-logo-color)"
          zIndex={overlay ? 1 : 0}
          resize="none"
          src={image}
          fallbackSrc={FallBackImage}
          className={`${group ? s.GroupLogo : s.SignleLogo} `}
        />
      ) : (
        <Image
          fallbackSrc={FallBackImage}
          src={image}
          resize="none"
          zIndex={overlay ? 1 : 0}
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
      )}
    </>
  );
}

export default Single_avatar;
