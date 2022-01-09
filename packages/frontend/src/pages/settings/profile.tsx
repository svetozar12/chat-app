import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/dist/client/link";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { InitialState3 } from "../../redux/state";
function profile(props: { cookie: string }) {
  const dispatch = useDispatch();
  const cookie = useCookie(props.cookie);
  const state = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = state.input_email;
    const gender = state.input_gender;
    if (!email && !gender) {
      return;
    }
    dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
    dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
  };

  return (
    <main style={{ height: "100vh" }} className="flex">
      <section style={{ width: "50%" }}>
        <form style={{ width: "100%" }} className="container">
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
            <span>
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
            </span>
            <span>
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
            </span>
          </div>
          <button onClick={handleSubmit} type="submit">
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
