import React from "react";
import axios from "axios";
import { requestUrl } from "utils/hostUrl_requestUrl";
import Single_avatar from "@/avatars/Single_avatar/Single_avatar";

function Group_avatar({
  cookieName,
  members,
}: {
  inviter: string;
  cookieName: string;
  members: string[];
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
      setImages([...images, requestString]);
      return true;
    } catch (error) {
      return false;
    }
  };
  React.useEffect(() => {
    members.forEach((element) => {
      getUserImage(element);
    });
  }, []);
  return (
    <div className="group_logo_container">
      {members.map((element, index) => {
        if (index === 2) return;

        return (
          <div>
            <Single_avatar
              key={index}
              inviter={element}
              cookieName={cookieName}
              width="2.3125rem"
              height="2.3125rem"
              group={true}
              overlay={index === 1 ? true : false}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Group_avatar;