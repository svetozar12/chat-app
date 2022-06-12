import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import ISave_inputState from "../../services/redux/reducer/save_inputReducer/state";
import { getFirstChat } from "../../utils/getFirstChat";
import UpdateInfoForm from "../../components/UpdateInfoForm";
import api_helper from "../../services/graphql/api_helper";

function Profile(props: { cookie: string }) {
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  React.useEffect(() => {
    (async () => {
      const first_id = await getFirstChat(cookie.get("id"), cookie.get("token"));
      setUrl(first_id._id);
    })();
  }, []);
  const handleSubmit = async (e: any) => {
    try {
      const formData = new FormData();
      formData.append("username", cookie.get("name"));
      if (state.input_email) formData.append("email", state.input_email);
      if (state.input_gender) formData.append("gender", state.input_gender);
      if (image) formData.append("userAvatar", image);

      e.preventDefault();
      await api_helper.user.update(cookie.get("id"), cookie.get("token"), formData as any);
      dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
      dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
    } catch (error) {
      return false;
    }
  };

  return (
    <main style={{ height: "100vh" }} className="flex">
      <section style={{ width: "80%" }}>
        <UpdateInfoForm url={url} handleSubmit={handleSubmit} image={image} setImage={setImage} />
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(context);
  if (!cookie.has("name") && !cookie.has("token")) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookie: context.req.headers.cookie,
    },
  };
};

export default Profile;
