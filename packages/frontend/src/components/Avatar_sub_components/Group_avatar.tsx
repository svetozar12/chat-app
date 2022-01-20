import React from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { requestUrl } from "../../utils/hostUrl_requestUrl";
function Single_avatar({
  inviter,
  cookieName,
  members,
}: {
  inviter: string;
  cookieName: string;
  members: string[];
}) {
  console.log(members);

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
      console.log(userAvatar, name);

      setHasAvatar(true);
      const requestString = `${requestUrl}/${userAvatar}`;
      setImages([...images, requestString]);
      return true;
    } catch (error) {
      return false;
    }
  };
  React.useEffect(() => {
    members.forEach((element, index) => {
      getUserImage(element);
    });
  }, []);
  return (
    <div className="group_logo_container">
      {hasAvatar ? (
        images.map((element, index) => {
          console.log(element, index);

          return (
            <img
              src={element}
              className={`group_logo ${
                index === 0 ? "logo_pos" : "logo_pos_overlay"
              }`}
            />
          );
        })
      ) : (
        <>
          <FaUserCircle
            style={{ top: "0", right: "0" }}
            className="group_logo"
          />
          <FaUserCircle
            style={{ bottom: "0", left: "0", zIndex: "1" }}
            className="group_logo"
          />
        </>
      )}
    </div>
  );
}

export default Single_avatar;
