/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { requestUrl } from "../../utils/hostUrl_requestUrl";
import { css } from "@emotion/css";

const logo_post_overlay = css`
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
    <div style={{ marginRight: "1rem" }}>
      {hasAvatar ? (
        <img
          src={image}
          style={{
            borderRadius: "50px",
            width: width,
            height: height,
            margin: "0",
          }}
          className={`${
            group
              ? group_logo
              : css`
                  width: 3.2rem;
                  height: 3.2rem;
                  color: var(--main-logo-color);
                  marginright: "1rem";
                  ${overlay ? "bottom: 0;" : "top:0"}
                  ${overlay ? "left: 0;" : "right:0"}
                `
          } ${overlay && logo_post_overlay}`}
        />
      ) : (
        <FaUserCircle
          data-testid="single_avatar"
          style={{ width: width, height: height }}
          className={`${group ? group_logo : logo_post_overlay} ${css`
            ${overlay ? "bottom: 0;" : "top:0"}
            ${overlay ? "left: 0;" : "right:0"}
            z-index: 1;
            ${!group_logo && "margin-right: 1rem;"}
            color: var(--main-logo-color);
          `}`}
        />
      )}
    </div>
  );
}

export default Single_avatar;
