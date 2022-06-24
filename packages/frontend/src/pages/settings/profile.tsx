import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookie } from "next-cookie";
// services
import ISave_inputState from "../../services/redux/reducer/save_inputReducer/state";
import api_helper from "../../services/graphql/api_helper";
// utils
import generic from "../../utils/generic";
import withAuthSync from "../../utils/auth";
import { useAuth } from "../../utils/SessionProvider";
import { getAuth } from "../../utils/authMethods";
// components
import { HStack } from "@chakra-ui/react";
import UpdateInfo from "../../components/UpdateInfo";
import SkelletonUserSettings from "../../components/Loading/SkelletonUserSettings";
import UpdateInfoForm from "../../components/UpdateInfo/UpdateInfoForm";

function Profile(props: { cookie: string }) {
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      cookie.set("REDIRECT_URL_CALLBACK", window.location.pathname);
      (async () => {
        getAuth();
        const first_id = await generic.getFirstChat(user._id, cookie.get("token"));
        setUrl(first_id._id);
      })();
    }
  }, []);

  if (!user) return <SkelletonUserSettings />;

  const handleSubmit = async (e: any) => {
    try {
      getAuth();
      const formData = new FormData();
      formData.append("username", user.username);
      if (state.input_email) formData.append("email", state.input_email);
      if (state.input_gender) formData.append("gender", state.input_gender);
      if (image) formData.append("userAvatar", image);

      e.preventDefault();
      await api_helper.user.update(user._id, cookie.get("token"), formData as any);
      dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
      dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
    } catch (error) {
      return false;
    }
  };

  return (
    <HStack w="full" h="100vh" alignItems="center" justifyContent="center">
      <UpdateInfo handleSubmit={handleSubmit} url={url}>
        <UpdateInfoForm image={image} setImage={setImage} />
      </UpdateInfo>
    </HStack>
  );
}

export const getServerSideProps = withAuthSync();

export default Profile;
