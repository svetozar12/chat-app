import React from "react";
import api_helper from "../../../services/graphql/api_helper";
import { css } from "@emotion/css";
import { useCookie } from "next-cookie";
const logo_post_overlay = css`
  z-index: 1;
`;

const group_logo = css`
  borderradius: "50px";
  margin: 0;
  width: 2.6rem;
  height: 2.6rem;
  background: white;
  border-radius: 100%;
`;
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
    <div style={{ marginRight: "1rem" }}>
      {preview ? (
        <img
          alt={`no avatar`}
          src={image}
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
      ) : (
        <img
          alt={`avatar logo`}
          src={image}
          className={`${
            group
              ? group_logo
              : css`
                  border-radius: 50px;
                  margin: 0;
                  width: ${width || "3.5rem"};
                  height: ${height || "3.5rem"};
                  color: var(--main-logo-color);
                  ${overlay ? "bottom: 0;" : "top:0"}
                  ${overlay ? "left: 0;" : "right:0"}
                `
          } ${overlay && logo_post_overlay}`}
        />
      )}
    </div>
  );
}

export default Single_avatar;
