import React from "react";
import api_helper from "../../../graphql/api_helper";
import { IAuthState } from "../../../redux/reducer/authReducer/state";
import Single_avatar from "../Single_avatar";
import { useSelector } from "react-redux";

function Group_avatar({ cookieName, members }: { inviter: string; cookieName: string; members: string[] }) {
  const [images, setImages] = React.useState<string[]>([]);
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const getUserImage = async (image: string) => {
    try {
      const res = await api_helper.user.getById(authState.cookie?.id as string, authState.cookie?.token as string);
      const userAvatar = res.data.user.userAvatar;
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
    <div title={`groupChat-${cookieName}`} className="group_logo_container">
      {members.map((element, index) => {
        if (index === 2) return;

        return (
          <div key={index} title={cookieName}>
            <Single_avatar
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
