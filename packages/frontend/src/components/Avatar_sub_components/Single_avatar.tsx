import React from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { requestUrl } from "../../utils/hostUrl_requestUrl";
function Single_avatar({
  inviter,
  cookieName,
}: {
  inviter: string;
  cookieName: string;
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
      <p style={{ color: "black" }}>{inviter || cookieName}</p>
      {hasAvatar ? (
        <img
          src={image}
          style={{ borderRadius: "50px" }}
          className="user-logo"
        />
      ) : (
        <FaUserCircle className="user-logo" />
      )}
    </div>
  );
}

export default Single_avatar;
