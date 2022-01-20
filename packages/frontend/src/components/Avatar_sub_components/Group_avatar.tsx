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
  const [images, setImages] = React.useState<string[]>([]);
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
      setImages((prev) => [...prev, requestString]);
      return true;
    } catch (error) {
      return false;
    }
  };

  //   (() => {
  //     getUserImage(inviter || cookieName);
  //   })();
  return (
    <div>
      <p style={{ color: "black" }}>{inviter || cookieName}</p>
      {hasAvatar ? (
        console.log(images)
      ) : (
        <>
          <FaUserCircle className="user-logo" />
          <FaUserCircle className="user-logo" />
        </>
      )}
    </div>
  );
}

export default Single_avatar;
