import React from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { requestUrl } from "../../../utils/hostUrl_requestUrl";
import { css } from "@emotion/css";
import Image from "next/image";
const logo_post_overlay = css`
  z-index: 1;
`;

const group_logo = css`
  borderradius: "50px";
  margin: 0;
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
  preview,
}: {
  inviter?: string;
  cookieName: string;
  width?: string;
  height?: string;
  overlay?: boolean;
  group?: boolean;
  preview?: string;
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
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${cookieName} logo`}
          // @ts-ignore
          src={URL.createObjectURL(preview)}
          className={`${
            group
              ? group_logo
              : css`
                  border-radius: 50px;
                  margin: 0;
                  width: ${width || "3.5rem"};
                  height: ${height || "3.5rem"};
                  color: var(--main-logo-color);
                `
          } ${overlay && logo_post_overlay}`}
        />
      ) : hasAvatar ? (
        <Image
          alt={`${cookieName} logo`}
          src={image}
          className={`${
            group
              ? group_logo
              : css`
                  borderradius: "50px";
                  margin: 0;
                  width: ${width || "3.5rem"};
                  height: ${height || "3.5rem"};
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
            z-index: 1;
            color: var(--main-logo-color);
            width: 3.5rem;
            height: 3.5rem;
            marginright: "1rem";
            ${!group_logo && "margin-right: 1rem;"}
            ${overlay ? "left: 0;" : "right:0"}
            ${overlay ? "bottom: 0;" : "top:0"}
          `}`}
        />
      )}
    </div>
  );
}

export default Single_avatar;
