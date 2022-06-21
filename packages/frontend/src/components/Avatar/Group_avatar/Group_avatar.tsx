import React from "react";
import api_helper from "../../../services/graphql/api_helper";
import Single_avatar from "../Single_avatar";
import { useCookie } from "next-cookie";

interface IGroup_avatar {
  members: string[];
}

function Group_avatar({ members }: IGroup_avatar) {
  const [images, setImages] = React.useState<string[]>([]);
  const cookie = useCookie();
  const getUserImage = async (image: string) => {
    try {
      const res = await api_helper.user.getById(cookie.get("id"), cookie.get("token"));
      const userAvatar = res.userAvatar;
      if (!userAvatar) {
        return false;
      }

      const requestString = `${image}`;
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
    <div title={`groupChat-${cookie.get("username")}`} className="group_logo_container">
      {members.map((element, index) => {
        if (index === 2) return;

        return (
          <div key={index} title={cookie.get("username")}>
            <Single_avatar width="2.3125rem" height="2.3125rem" group={true} overlay={index === 1 ? true : false} />
          </div>
        );
      })}
    </div>
  );
}

export default Group_avatar;
