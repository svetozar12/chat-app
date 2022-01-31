/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { requestUrl } from "../../utils/hostUrl_requestUrl";
import { css } from "@emotion/css";

const logo_post_overlay = css`
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const group_logo = css`
  width: 2.6rem;
  height: 2.6rem;
`;
function Single_avatar({
  inviter,
  cookieName,
  width,
  height,
  overlay,
  group,
}: {
  inviter: string;
  cookieName: string;
  width?: string;
  height?: string;
  overlay?: boolean;
  group?: boolean;
}) {
  const [image, setImage] = React.useState<string>("");
  const [hasAvatar, setHasAvatar] = React.useState<boolean>(false);

  const getUserImage = async (name: string) => {
    try {
      const res = await axios.get(`${requestUrl}/users/${name}`);
      const userAvatar = res.data.user.userAvatar;
      if (!userAvatar) {
        setHasAvatar(false);
        return false;
      }
      setHasAvatar(true);
      const requestString = `${requestUrl}/${userAvatar}`;
      setImage(requestString);
      return true;
    } catch (error) {
      return false;
    }
  };

  (() => {
    getUserImage(inviter || cookieName);
  })();

  return (
    <div>
      {hasAvatar ? (
        <img
          src={image}
          style={{ borderRadius: "50px", width: width, height: height }}
          className={`${
            group
              ? group_logo
              : css`
                  width: 3.2rem;
                  height: 3.2rem;
                  color: var(--main-logo-color);
                  margin-right: 1rem;
                `
          } ${overlay && logo_post_overlay}`}
        />
      ) : (
        <FaUserCircle
          style={{ width: width, height: height }}
          className={`${group ? group_logo : logo_post_overlay} ${
            overlay &&
            css`
              bottom: 0;
              left: 0;
              z-index: 1;
            `
          }`}
        />
      )}
    </div>
  );
}

export default Single_avatar;
