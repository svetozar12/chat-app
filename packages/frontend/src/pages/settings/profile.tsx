import React from "react";
import Link from "next/dist/client/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { InitialState3 } from "../../redux/state";
import { requestUrl } from "../../utils/hostUrl_requestUrl";

function profile(props: { cookie: string }) {
  const [image, setImage] = React.useState("");
  const dispatch = useDispatch();
  const cookie = useCookie(props.cookie);
  const state = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

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
        .then((res) => {
          return true;
        })
        .catch((err) => {
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
      <section style={{ width: "59%" }}>
        <form
          style={{ width: "100%", minWidth: "342px" }}
          className="container"
        >
          <h2 style={{ fontSize: "2vw" }}>Update your profile info</h2>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={state.input_email}
            onChange={(e) =>
              dispatch({
                type: "SAVE_INPUT_EMAIL",
                payload: e.target.value,
              })
            }
          />
          <div className="input_gender">
            <div>
              <label htmlFor="Male">Male</label>
              <input
                onChange={(e) =>
                  dispatch({
                    type: "SAVE_INPUT_GENDER",
                    payload: e.target.value,
                  })
                }
                type="radio"
                name="gender"
                id="Male"
                value="Male"
              />
            </div>
            <div>
              <label htmlFor="Female">Female</label>
              <input
                onChange={(e) =>
                  dispatch({
                    type: "SAVE_INPUT_GENDER",
                    payload: e.target.value,
                  })
                }
                type="radio"
                name="gender"
                id="Female"
                value="Female"
              />
            </div>
            <div>
              <label htmlFor="Others">Others</label>
              <input
                onChange={(e) =>
                  dispatch({
                    type: "SAVE_INPUT_GENDER",
                    payload: e.target.value,
                  })
                }
                type="radio"
                name="gender"
                id="Others"
                value="Others"
              />
            </div>
          </div>
          <input
            type="file"
            name="userAvatar"
            placeholder="Select file"
            className="input_file"
            id="file"
            style={{ display: "none" }}
            onChange={(e: any) => setImage(e.target.files[0])}
          />
          <label className="input_file" htmlFor="file">
            Add file
          </label>
          <button
            style={{ fontSize: "1vw", textAlign: "center" }}
            onClick={handleSubmit}
            type="submit"
          >
            Update
          </button>
          <Link href={`/${cookie.get("first_chat_id")}`}>
            <a className="link" style={{ color: "var(--main-blue)" }}>
              Go back
            </a>
          </Link>
        </form>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

export default profile;
