import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import ISave_inputState from "../../redux/reducer/save_inputReducer/state";
import { requestUrl } from "../../utils/hostUrl_requestUrl";
import { getFirstChat } from "../../utils/getFirstChat";
import UpdateInfoForm from "../../components/UpdateInfoForm";

function Profile(props: { cookie: string }) {
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  React.useEffect(() => {
    (async () => {
      const first_id = await getFirstChat(cookie.get("name"));
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

      axios
        .put(`${requestUrl}/users/update`, formData)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
      dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
      dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
    } catch (error) {
      return false;
    }
  };

  return (
    <main style={{ height: "100vh" }} className="flex">
      <section style={{ width: "80%" }}>
        <UpdateInfoForm cookieName={cookie.get("name")} url={url} handleSubmit={handleSubmit} image={image} setImage={setImage} />
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
